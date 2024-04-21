package com.sira.controller;

import com.sira.dto.AuthenticationRequest;
import com.sira.dto.AuthenticationResponse;
import com.sira.model.User;
import com.sira.repository.UserRepository;
import com.sira.service.AuthenticationService;
import com.sira.util.Role;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody @Valid AuthenticationRequest authRequest){
        AuthenticationResponse jwtDto = authenticationService.login(authRequest);
        return ResponseEntity.ok(jwtDto);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid AuthenticationRequest authRequest) throws Exception {
        AuthenticationResponse jwtDto = authenticationService.register(authRequest);

        return ResponseEntity.ok(jwtDto);
    }

    @GetMapping("/public-access")
    public String publicAccess(){
        return "Este endpoint es de acceso público";
    }
}
