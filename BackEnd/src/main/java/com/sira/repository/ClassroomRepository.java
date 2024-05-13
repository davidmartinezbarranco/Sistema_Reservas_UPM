package com.sira.repository;

import com.sira.model.Classroom;
import com.sira.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {

    @Query("SELECT r FROM Reservation r WHERE MONTH(r.startDate) = :month AND r.classroom.id = :classroomId AND r.user.role = 'TEACHER' AND r.capacity > 0")
    List<Reservation> findTeacherReservationsByMonthAndClassroomId(@Param("classroomId") Long classroomId, @Param("month") int month);

    @Query("SELECT r FROM Reservation r WHERE MONTH(r.startDate) = :month AND r.classroom.id = :classroomId AND r.user.role = 'STUDENT'")
    List<Reservation> findStudentReservationsByMonthAndClassroomIdAndRole(@Param("classroomId") Long classroomId, @Param("month") int month);

    @Query("SELECT r FROM Reservation r WHERE MONTH(r.startDate) = :month AND DAY(r.startDate) = :day AND r.classroom.id = :classroomId AND r.user.role = 'TEACHER' AND r.capacity > 0")
    List<Reservation> findTeacherReservationsByDayAndClassroomId(@Param("classroomId") Long classroomId, @Param("month") int month, @Param("day") int day);

    @Query("SELECT r FROM Reservation r WHERE MONTH(r.startDate) = :month AND DAY(r.startDate) = :day AND r.classroom.id = :classroomId AND r.user.role = 'STUDENT'")
    List<Reservation> findStudentReservationsByDayAndClassroomId(@Param("classroomId") Long classroomId, @Param("month") int month, @Param("day") int day);

}
