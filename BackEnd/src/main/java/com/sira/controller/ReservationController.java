package com.sira.controller;

import com.sira.dto.ReservationAndClassroomDto;
import com.sira.dto.ProfessorReservationDto;
import com.sira.dto.StudentReservationDto;
import com.sira.model.ProfessorReservation;
import com.sira.model.StudentReservation;
import com.sira.service.JwtService;
import com.sira.service.ProfessorReservationService;
import com.sira.service.StudentReservationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReservationController {

    private final ProfessorReservationService professorReservationService;
    private final StudentReservationService studentReservationService;
    private final JwtService jwtService;

    public ReservationController(ProfessorReservationService professorReservationService,
                                 StudentReservationService studentReservationService, JwtService jwtService) {
        this.professorReservationService = professorReservationService;
        this.studentReservationService = studentReservationService;
        this.jwtService = jwtService;
    }

    @PreAuthorize("hasRole('ADMINISTRATOR')")
    @GetMapping("/reservations-professor")
    List<ProfessorReservation> allProfessorReservations() {
        return professorReservationService.getAllReservations();
    }

    @PreAuthorize("hasRole('PROFESSOR')")
    @GetMapping("/reservations-professor/user")
    List<ReservationAndClassroomDto> allProfessorReservationsByUser(@RequestHeader("Authorization") String authorizationHeader) {
        String email = jwtService.extractEmail(authorizationHeader.substring(7));
        return professorReservationService.getReservationsByUserId(email);
    }

    @PreAuthorize("hasRole('PROFESSOR')")
    @PostMapping("/reservation-professor")
    ProfessorReservationDto newProfessorReservation(@RequestBody ProfessorReservationDto professorReservationRequest,
                                                    @RequestHeader("Authorization") String authorizationHeader) {
        String email = jwtService.extractEmail(authorizationHeader.substring(7));
        return professorReservationService.createReservation(professorReservationRequest, email);
    }

    @PreAuthorize("hasRole('ADMINISTRATOR')")
    @GetMapping("/reservations-student")
    List<StudentReservation> allStudentReservations() {
        return studentReservationService.getAllReservations();
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/reservations-student/user")
    List<ReservationAndClassroomDto> allStudentReservationsByUserId(@RequestHeader("Authorization") String authorizationHeader) {
        String email = jwtService.extractEmail(authorizationHeader.substring(7));
        return studentReservationService.getReservationsByUserEmail(email);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/reservation-student")
    StudentReservationDto newStudentReservation(@RequestBody StudentReservationDto studentReservationRequest,
                                                @RequestHeader("Authorization") String authorizationHeader){
        String email = jwtService.extractEmail(authorizationHeader.substring(7));
        return studentReservationService.createReservation(studentReservationRequest, email);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @DeleteMapping("/reservation-student/{id}/delete")
    StudentReservation deleteStudentReservation(@PathVariable Long id, @RequestHeader("Authorization") String authorizationHeader) {
        String email = jwtService.extractEmail(authorizationHeader.substring(7));
        return studentReservationService.deleteReservation(id, email);
    }

    @PreAuthorize("hasRole('PROFESSOR')")
    @DeleteMapping("/reservation-professor/{id}/delete")
    ProfessorReservation deleteProfessorReservation(@PathVariable Long id, @RequestHeader("Authorization") String authorizationHeader){
        String email = jwtService.extractEmail(authorizationHeader.substring(7));
        return professorReservationService.deleteReservation(id, email);
    }
}
