package com.sira.repository;

import com.sira.model.StudentReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentReservationRepository extends JpaRepository<StudentReservation, Long> {
    List<StudentReservation> findAllByUserId(Long userId);
    List<StudentReservation> findAllByUserEmail(String email);
    @Query("SELECT sr FROM StudentReservation sr WHERE sr.user.email = :email AND EXTRACT(DAY FROM sr.startDate) = :day AND EXTRACT(MONTH FROM sr.startDate) = :month AND EXTRACT(YEAR FROM sr.startDate) = :year")
    List<StudentReservation> findReservationsByUserEmailAndDayMonthYear(@Param("email") String email, @Param("day") int day, @Param("month") int month, @Param("year") int year);
}
