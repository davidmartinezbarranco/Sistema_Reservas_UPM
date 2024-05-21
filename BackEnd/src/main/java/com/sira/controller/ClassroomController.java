package com.sira.controller;

import com.sira.model.Classroom;
import com.sira.model.Reservation;
import com.sira.service.ClassroomService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/classrooms")
public class ClassroomController {
    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @GetMapping("")
    List<Classroom> allReservations(){return this.classroomService.getAllReservations();}

    @GetMapping("/{classroomId}/availability-professor/{month}/{year}")
    boolean[] classroomProfessorAvailabilityByMonth(@PathVariable Long classroomId, @PathVariable int month, @PathVariable int year){
        return classroomService.getClassroomProfessorAvailabilityByMonth(classroomId, month, year);
    }

    @GetMapping("/{classroomId}/availability-professor/{day}/{month}/{year}")
    boolean[] classroomProfessorAvailabilityByDay(@PathVariable Long classroomId, @PathVariable int day, @PathVariable int month, @PathVariable int year){
        return this.classroomService.getClassroomProfessorAvailabilityByDay(classroomId, day, month, year);
    }

    @GetMapping("/{classroomId}/availability-student/{month}/{year}")
    boolean[] classroomStudentAvailabilityByMonth(@PathVariable Long classroomId, @PathVariable int month, @PathVariable int year){
        return classroomService.getClassroomStudentAvailabilityByMonth(classroomId, month, year);
    }

    @GetMapping("/{classroomId}/availability-student/{day}/{month}/{year}")
    boolean[] classroomStudentAvailabilityByDay(@PathVariable Long classroomId, @PathVariable int day, @PathVariable int month, @PathVariable int year){
        return this.classroomService.getClassroomStudentAvailabilityByDay(classroomId, day, month, year);
    }
}
