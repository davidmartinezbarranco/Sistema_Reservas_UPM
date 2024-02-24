package com.sira.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
@Entity
public class User {
    @GeneratedValue
    @Id
    private Long id;
    
    private String name;
    private String password;
    private String email;
    @ManyToMany
    private Reserva reserva;

    public User (String name, String email){
        this.name = name;
        this.email = email;
    }
}
