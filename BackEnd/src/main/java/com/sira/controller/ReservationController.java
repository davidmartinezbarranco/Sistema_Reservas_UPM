package com.sira.controller;

import com.sira.dto.ReservationAndClassroomDto;
import com.sira.dto.ProfessorReservationDto;
import com.sira.dto.StudentReservationDto;
import com.sira.model.ProfessorReservation;
import com.sira.model.Reservation;
import com.sira.model.StudentReservation;
import com.sira.service.ProfessorReservationService;
import com.sira.service.StudentReservationService;
import com.sira.util.Role;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ReservationController {

    private final ProfessorReservationService professorReservationService;
    private final StudentReservationService studentReservationService;

    public ReservationController(ProfessorReservationService professorReservationService,
                                 StudentReservationService studentReservationService) {
        this.professorReservationService = professorReservationService;
        this.studentReservationService = studentReservationService;
    }

    @GetMapping("/reservations-professor")
    List<ProfessorReservation> allProfessorReservations() {
        return professorReservationService.getAllReservations();
    }

    @GetMapping("/reservations-professor/user/{id}")
    List<ReservationAndClassroomDto> allProfessorReservationsByUserId(@PathVariable Long id) {
        return professorReservationService.getReservationsByUserId(id);
    }

    @PostMapping("/reservation-professor")
    ProfessorReservationDto newProfessorReservation(@RequestBody ProfessorReservationDto professorReservationRequest) {
        return professorReservationService.createReservation(professorReservationRequest);
    }

    @GetMapping("/reservations-student")
    List<StudentReservation> allStudentReservations() {
        return studentReservationService.getAllReservations();
    }

    @GetMapping("/reservations-student/user/{id}")
    List<ReservationAndClassroomDto> allStudentReservationsByUserId(@PathVariable Long id) {
        return studentReservationService.getReservationsByUserId(id);
    }
    @PostMapping("/reservation-student")
    StudentReservationDto newStudentReservation(@RequestBody StudentReservationDto studentReservationRequest) throws Exception {
        return studentReservationService.createReservation(studentReservationRequest);
    }

    @DeleteMapping("/reservation-student/{id}/delete")
    StudentReservation deleteStudentReservation(@PathVariable Long id) {
        return studentReservationService.deleteReservation(id);
    }
    @DeleteMapping("/reservation-professor/{id}/delete")
    ProfessorReservation deleteProfessorReservation(@PathVariable Long id){
        return professorReservationService.deleteReservation(id);
    }
}
