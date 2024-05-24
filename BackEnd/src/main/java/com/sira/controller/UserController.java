package com.sira.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sira.dto.AuthenticationRequest;
import com.sira.dto.ModifiedUserDto;
import com.sira.service.AuthenticationService;
import com.sira.service.JwtService;
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

    @Autowired
    public UserController(UserRepository userRepository, AuthenticationService authenticationService){
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
    }

    @PreAuthorize("hasRole('ADMINISTRATOR')")
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasAuthority('READ_USER_BY_ID')")
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable() Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado con el ID: " + id));
    }

    @PreAuthorize("hasAuthority('MODIFY_USER_BY_ID')")
    @PatchMapping("/user/{id}")
    public ModifiedUserDto modifyUser(@PathVariable Long id, @RequestBody User user){
        return authenticationService.modifyUserAndGetJwt(id, user);
    }

    @PreAuthorize("hasAuthority('DELETE_USER_BY_ID')")
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
    }
}
