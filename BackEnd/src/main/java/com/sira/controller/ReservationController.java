package com.sira.controller;

import com.sira.dto.ReservationAndClassroomDto;
import com.sira.dto.ProfessorReservationDto;
import com.sira.dto.StudentReservationDto;
import com.sira.model.ProfessorReservation;
import com.sira.model.StudentReservation;
import com.sira.service.ProfessorReservationService;
import com.sira.service.StudentReservationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReservationController {

    private final ProfessorReservationService professorReservationService;
    private final StudentReservationService studentReservationService;

    public ReservationController(ProfessorReservationService professorReservationService,
                                 StudentReservationService studentReservationService) {
        this.professorReservationService = professorReservationService;
        this.studentReservationService = studentReservationService;
    }

    @PreAuthorize("hasRole('ADMINISTRATOR')")
    @GetMapping("/reservations-professor")
    List<ProfessorReservation> allProfessorReservations() {
        return professorReservationService.getAllReservations();
    }

    @PreAuthorize("hasRole('PROFESSOR')")
    @GetMapping("/reservations-professor/user/{id}")
    List<ReservationAndClassroomDto> allProfessorReservationsByUserId(@PathVariable Long id) {
        return professorReservationService.getReservationsByUserId(id);
    }

    @PreAuthorize("hasRole('PROFESSOR')")
    @PostMapping("/reservation-professor")
    ProfessorReservationDto newProfessorReservation(@RequestBody ProfessorReservationDto professorReservationRequest) {
        return professorReservationService.createReservation(professorReservationRequest);
    }

    @PreAuthorize("hasRole('ADMINISTRATOR')")
    @GetMapping("/reservations-student")
    List<StudentReservation> allStudentReservations() {
        return studentReservationService.getAllReservations();
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/reservations-student/user/{id}")
    List<ReservationAndClassroomDto> allStudentReservationsByUserId(@PathVariable Long id) {
        return studentReservationService.getReservationsByUserId(id);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/reservation-student")
    StudentReservationDto newStudentReservation(@RequestBody StudentReservationDto studentReservationRequest) throws Exception {
        return studentReservationService.createReservation(studentReservationRequest);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @DeleteMapping("/reservation-student/{id}/delete")
    StudentReservation deleteStudentReservation(@PathVariable Long id) {
        return studentReservationService.deleteReservation(id);
    }

    @PreAuthorize("hasRole('PROFESSOR')")
    @DeleteMapping("/reservation-professor/{id}/delete")
    ProfessorReservation deleteProfessorReservation(@PathVariable Long id){
        return professorReservationService.deleteReservation(id);
    }
}
