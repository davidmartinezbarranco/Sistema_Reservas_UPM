package com.sira.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.sira.model.User;
import com.sira.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.server.ResponseStatusException;


@RestController
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasAuthority('READ_ALL_USERS')")
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasAuthority('READ_ALL_USERS')")
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable() Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado con el ID: " + id));
    }

    @PreAuthorize("hasAuthority('READ_ALL_USERS')")
    @PatchMapping("/users/{id}")
    public User modifyUser(@PathVariable Long id, @RequestBody User user){
        return userRepository.findById(id)
                .map(updatedUser -> {
                    if (updatedUser.getUsername() != null) {
                        user.setUsername(updatedUser.getUsername());
                    }
                    //TODO
                    // Actualizar otros campos según vayamos desarrolando
                    return userRepository.save(user);
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus
                        .NOT_FOUND, "Usuario no encontrado con el ID: " + id));
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneriException(Exception exception, HttpServletRequest request){
        Map<String, String> apiError = new HashMap<>();
        apiError.put("message", exception.getLocalizedMessage());
        apiError.put("timestamp", new Date().toString());
        apiError.put("url", request.getRequestURL().toString());
        apiError.put("http-method", request.getMethod());

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if(exception instanceof AccessDeniedException){
            status = HttpStatus.FORBIDDEN;
        }
        return ResponseEntity.status(status).body(apiError);

    }
}
