package com.sira.service;

import com.sira.dto.AuthenticationRequest;
import com.sira.dto.AuthenticationResponse;
import com.sira.dto.ModifiedUserDto;
import com.sira.dto.RegisterRequest;
import com.sira.model.User;
import com.sira.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public AuthenticationService(AuthenticationManager authenticationManager, UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    public AuthenticationResponse login(AuthenticationRequest authRequest) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(), authRequest.getPassword()
        );
        authenticationManager.authenticate(authToken);

        User user = userRepository.findByEmail(authRequest.getEmail()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email no existente"));

        String jwt = jwtService.generateToken(user, generateExtraClaims(user));

        return new AuthenticationResponse(user.getId(),jwt);
    }

    public AuthenticationResponse register(RegisterRequest authRequest) throws Exception {
        if (userRepository.existsByEmail(authRequest.getEmail())) {
            throw new Exception("El email ya está en uso");
        }

        User user = new User(authRequest.getName(), authRequest.getLastName(),
                authRequest.getEmail(), passwordEncoder.encode(authRequest.getPassword()),
                authRequest.getRole());

        userRepository.save(user);

        String jwt = jwtService.generateToken(user, generateExtraClaims(user));

        return new AuthenticationResponse(user.getId(), jwt);
    }

    public ModifiedUserDto modifyUserAndGetJwt(Long id, User user) {
        ModifiedUserDto modifiedUserDto;
        User updatedUser =  userRepository.findById(id)
                .map(modifiedUser -> {
                    if (user.getEmail() != null) {
                        if(!userRepository.existsByEmail(user.getEmail())){
                            modifiedUser.setEmail(user.getEmail());
                        }else{
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ya existe un usuario con ese email");
                        }
                    }
                    if (user.getName() != null) {
                        modifiedUser.setName(user.getName());
                    }
                    if (user.getLastName() != null) {
                        modifiedUser.setLastName(user.getLastName());
                    }
                    if (user.getPassword() != null) {
                        modifiedUser.setPassword(passwordEncoder.encode(user.getPassword()));
                    }
                    return modifiedUser;
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus
                        .NOT_FOUND, "Usuario no encontrado con el ID: " + id));

        modifiedUserDto = modelMapper.map(userRepository.save(updatedUser), ModifiedUserDto.class);
        modifiedUserDto.setJwt(jwtService.generateToken(updatedUser, generateExtraClaims(updatedUser)));
        return modifiedUserDto;
    }

    private Map<String, Object> generateExtraClaims(User user) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("name", user.getName());
        extraClaims.put("role", user.getRole().name());
        extraClaims.put("permissions", user.getAuthorities());
        return extraClaims;
    }
}
