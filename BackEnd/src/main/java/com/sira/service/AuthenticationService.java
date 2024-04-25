package com.sira.service;

import com.sira.dto.AuthenticationRequest;
import com.sira.dto.AuthenticationResponse;
import com.sira.dto.RegisterRequest;
import com.sira.model.User;
import com.sira.repository.UserRepository;
import com.sira.util.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthenticationResponse login(AuthenticationRequest authRequest) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                authRequest.getUsername(), authRequest.getPassword()
        );
        authenticationManager.authenticate(authToken);

        User user = userRepository.findByUsername(authRequest.getUsername()).get();

        String jwt = jwtService.generateToken(user, generateExtraClaims(user));

        return new AuthenticationResponse(jwt);
    }

    public AuthenticationResponse register(RegisterRequest authRequest) throws Exception {
        if (userRepository.existsByUsername(authRequest.getEmail())) {
            throw new Exception("El email ya está en uso");
        }

        // Crear un nuevo usuario
        User user = new User(authRequest.getName(), authRequest.getLastName(),
                authRequest.getEmail(), passwordEncoder.encode(authRequest.getPassword()),
                authRequest.getRole());

        // Guardar el usuario en la base de datos
        userRepository.save(user);

        String jwt = jwtService.generateToken(user, generateExtraClaims(user));

        return new AuthenticationResponse(jwt);
    }

    private Map<String, Object> generateExtraClaims(User user) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("name", user.getName());
        extraClaims.put("role", user.getRole().name());
        extraClaims.put("permissions", user.getAuthorities());
        return extraClaims;
    }
}
