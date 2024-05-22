package com.sira.repository;

import com.sira.model.ProfessorReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProfessorReservationRepository extends JpaRepository<ProfessorReservation, Long> {
    List<ProfessorReservation> findAllByUserId(Long userId);
    @Query("SELECT pr FROM ProfessorReservation pr " +
            "WHERE pr.startDate <= :startDate " +
            "AND pr.endDate > :startDate")
    Optional<ProfessorReservation> findOverlappingReservations(@Param("startDate") LocalDateTime startDate);

    @Query("SELECT pr FROM ProfessorReservation pr " +
            "WHERE pr.classroom.id = :classroomId " +
            "AND YEAR(pr.startDate) = :year " +
            "AND MONTH(pr.startDate) = :month ")
    List<ProfessorReservation> findProfessorReservationsByClassroomAndMonthAndYear(Long classroomId, int month, int year);

    @Query("SELECT pr FROM ProfessorReservation pr " +
            "WHERE pr.classroom.id = :classroomId " +
            "AND YEAR(pr.startDate) = :year " +
            "AND MONTH(pr.startDate) = :month " +
            "AND DAY(pr.startDate) = :day ")
    List<ProfessorReservation> findProfessorReservationsByClassroomAndDayAndMonthAndYear(Long classroomId,int day, int month, int year);

}
