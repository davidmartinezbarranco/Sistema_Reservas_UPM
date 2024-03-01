package com.sira.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sira.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
}
