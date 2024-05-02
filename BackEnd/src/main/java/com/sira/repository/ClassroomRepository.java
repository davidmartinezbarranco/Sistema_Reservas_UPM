package com.sira.repository;

import com.sira.model.Classroom;
import com.sira.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {

    @Query("SELECT r FROM Reservation r WHERE MONTH(r.startDate) = :month AND r.classroom.id = :classroomId")
    List<Reservation> findReservationsByMonthAndClassroomId(@Param("classroomId") Long classroomId, @Param("month") int month);

    @Query("SELECT r FROM Reservation r WHERE MONTH(r.startDate) = :month AND DAY(r.startDate) = :day AND r.classroom.id = :classroomId")
    List<Reservation> findReservationsByDayAndClassroomId(@Param("classroomId") Long classroomId, @Param("month") int month, @Param("day") int day);
}
