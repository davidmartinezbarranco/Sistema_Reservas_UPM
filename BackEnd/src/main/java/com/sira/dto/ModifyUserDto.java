package com.sira.dto;

import com.sira.util.Role;
import lombok.Data;

@Data
public class ModifyUserDto {
    private String name;
    private String lastName;
    private String email;
    private Role role;
}
