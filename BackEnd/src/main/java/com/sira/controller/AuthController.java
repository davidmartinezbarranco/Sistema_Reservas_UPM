package com.sira.controller;

import com.sira.dto.AuthenticationRequest;
import com.sira.dto.AuthenticationResponse;
import com.sira.dto.RegisterRequest;
import com.sira.repository.UserRepository;
import com.sira.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthenticationService authenticationService;

    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody @Valid AuthenticationRequest authRequest){
        AuthenticationResponse jwtDto = authenticationService.login(authRequest);
        return ResponseEntity.ok(jwtDto);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid RegisterRequest authRequest) throws Exception {
        AuthenticationResponse jwtDto = authenticationService.register(authRequest);

        return ResponseEntity.ok(jwtDto);
    }
}
