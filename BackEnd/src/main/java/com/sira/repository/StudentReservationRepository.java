package com.sira.repository;

import com.sira.model.Reservation;
import com.sira.model.StudentReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentReservationRepository extends JpaRepository<StudentReservation, Long> {
    List<StudentReservation> findAllByUserId(Long userId);
}
