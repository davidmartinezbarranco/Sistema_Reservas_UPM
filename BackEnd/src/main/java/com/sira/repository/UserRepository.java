package com.sira.repository;

import com.sira.util.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sira.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
