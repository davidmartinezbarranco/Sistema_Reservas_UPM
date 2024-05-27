package com.sira.controller;

import java.util.List;

import com.sira.dto.ModifiedUserDto;
import com.sira.service.AuthenticationService;
import com.sira.service.JwtService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
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
    private final JwtService jwtService;

    @Autowired
    public UserController(UserRepository userRepository, AuthenticationService authenticationService, JwtService jwtService){
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
    }

    @PreAuthorize("hasRole('ADMINISTRATOR')")
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasAuthority('READ_USER_BY_ID')")
    @GetMapping("/user")
    public User getUserById(@RequestHeader("Authorization") String authorizationHeader){
        String email = jwtService.extractEmail(authorizationHeader.substring(7));
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado con el email: " + email));
    }

    @PreAuthorize("hasAuthority('MODIFY_USER_BY_ID')")
    @PatchMapping("/user")
    public ModifiedUserDto modifyUser(@RequestBody User user, @RequestHeader("Authorization") String authorizationHeader){
        String email = jwtService.extractEmail(authorizationHeader.substring(7));
        return authenticationService.modifyUserAndGetJwt(email, user);
    }

    @PreAuthorize("hasAuthority('DELETE_USER_BY_ID')")
    @DeleteMapping("/user")
    @Transactional
    public void deleteUser(@RequestHeader("Authorization") String authorizationHeader){
        String email = jwtService.extractEmail(authorizationHeader.substring(7));
        userRepository.deleteByEmail(email);
    }
}
