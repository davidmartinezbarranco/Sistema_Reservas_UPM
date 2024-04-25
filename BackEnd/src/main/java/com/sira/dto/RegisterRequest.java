package com.sira.dto;

import com.sira.util.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String lastName;
    private String email;
    private String password;
    private Role role;

}
