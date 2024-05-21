package com.sira.service;

import com.sira.dto.AuthenticationRequest;
import com.sira.dto.AuthenticationResponse;
import com.sira.dto.RegisterRequest;
import com.sira.model.User;
import com.sira.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(AuthenticationManager authenticationManager, UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthenticationResponse login(AuthenticationRequest authRequest) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(), authRequest.getPassword()
        );
        authenticationManager.authenticate(authToken);

        User user = userRepository.findByEmail(authRequest.getEmail()).get();

        String jwt = jwtService.generateToken(user, generateExtraClaims(user));

        return new AuthenticationResponse(user.getId(),jwt);
    }

    public AuthenticationResponse register(RegisterRequest authRequest) throws Exception {
        if (userRepository.existsByEmail(authRequest.getEmail())) {
            throw new Exception("El email ya está en uso");
        }

        // Crear un nuevo usuario
        User user = new User(authRequest.getName(), authRequest.getLastName(),
                authRequest.getEmail(), passwordEncoder.encode(authRequest.getPassword()),
                authRequest.getRole());

        // Guardar el usuario en la base de datos
        userRepository.save(user);

        String jwt = jwtService.generateToken(user, generateExtraClaims(user));

        return new AuthenticationResponse(user.getId(), jwt);
    }

    private Map<String, Object> generateExtraClaims(User user) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("name", user.getName());
        extraClaims.put("role", user.getRole().name());
        extraClaims.put("permissions", user.getAuthorities());
        return extraClaims;
    }
}
