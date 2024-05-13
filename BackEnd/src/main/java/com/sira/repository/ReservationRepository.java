package com.sira.repository;

import com.sira.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByUserId(Long userId);
    @Query("SELECT r FROM Reservation r WHERE r.startDate = :startDate AND r.endDate = :endDate AND r.user.role = 'TEACHER'")
    Reservation findByStartDateAndEndDateAndTeacherRole(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
