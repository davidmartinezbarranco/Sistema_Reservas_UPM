package com.sira.dto;

import lombok.Data;

@Data
public class ModifiedUserDto {
    private String name;
    private String lastName;
    private String email;
    private String jwt;
}
