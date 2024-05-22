package com.sira.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sira.dto.ModifyUserDto;
import com.sira.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
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
    private final AuthenticationService authenticationService;
    private final ModelMapper modelMapper;

    @Autowired
    public UserController(UserRepository userRepository, AuthenticationService authenticationService, ModelMapper modelMapper){
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
        this.modelMapper = modelMapper;
    }

    @PreAuthorize("hasRole('ADMINISTRATOR')")
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

    @PatchMapping("/user/{id}")
    public ModifyUserDto modifyUser(@PathVariable Long id, @RequestBody User user){
        return userRepository.findById(id)
                .map(updatedUser -> {
                    if (user.getEmail() != null) {
                        updatedUser.setEmail(user.getEmail());
                    }
                    if (user.getName() != null) {
                        updatedUser.setName(user.getName());
                    }
                    if (user.getLastName() != null) {
                        updatedUser.setLastName(user.getLastName());
                    }
                    if (user.getPassword() != null) {
                        authenticationService.modifyPassword(user.getPassword(), updatedUser);
                    }
                    return modelMapper.map(userRepository.save(updatedUser), ModifyUserDto.class);
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
