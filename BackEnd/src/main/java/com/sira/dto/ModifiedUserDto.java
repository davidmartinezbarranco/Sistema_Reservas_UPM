package com.sira.dto;

import com.sira.util.Role;
import lombok.Data;

@Data
public class ModifiedUserDto {
    private String name;
    private String lastName;
    private String email;
    private Role role;
    private String jwt;
}
