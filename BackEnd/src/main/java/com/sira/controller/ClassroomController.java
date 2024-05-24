package com.sira.controller;

import com.sira.model.Classroom;
import com.sira.service.ClassroomService;
import com.sira.service.JwtService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classrooms")
public class ClassroomController {
    private final ClassroomService classroomService;
    private final JwtService jwtService;

    public ClassroomController(ClassroomService classroomService, JwtService jwtService) {
        this.classroomService = classroomService;
        this.jwtService = jwtService;
    }

    @PreAuthorize("hasAuthority('READ_ALL_CLASSROOMS')")
    @GetMapping("")
    List<Classroom> allClassroom(){return this.classroomService.getAllReservations();}

    @PreAuthorize("hasRole('PROFESSOR')")
    @GetMapping("/{classroomId}/availability-professor/{month}/{year}")
    boolean[] classroomProfessorAvailabilityByMonth(@PathVariable Long classroomId, @PathVariable int month, @PathVariable int year){
        return classroomService.getClassroomProfessorAvailabilityByMonth(classroomId, month, year);
    }

    @PreAuthorize("hasRole('PROFESSOR')")
    @GetMapping("/{classroomId}/availability-professor/{day}/{month}/{year}")
    boolean[] classroomProfessorAvailabilityByDay(@PathVariable Long classroomId, @PathVariable int day, @PathVariable int month, @PathVariable int year){
        return this.classroomService.getClassroomProfessorAvailabilityByDay(classroomId, day, month, year);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/{classroomId}/availability-student/{month}/{year}")
    boolean[] classroomStudentAvailabilityByMonth(@PathVariable Long classroomId, @PathVariable int month,
                                                  @PathVariable int year, @RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7);
        return classroomService.getClassroomStudentAvailabilityByMonth(classroomId, month, year, jwtService.extractEmail(token));
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/{classroomId}/availability-student/{day}/{month}/{year}")
    boolean[] classroomStudentAvailabilityByDay(@PathVariable Long classroomId, @PathVariable int day,
                                                @PathVariable int month, @PathVariable int year,
                                                @RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7);
        return this.classroomService.getClassroomStudentAvailabilityByDay(classroomId, day, month, year, jwtService.extractEmail(token));
    }
}
