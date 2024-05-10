package com.sira.controller;

import com.sira.model.Classroom;
import com.sira.model.Reservation;
import com.sira.repository.ClassroomRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/classrooms")
public class ClassroomController {
    private final ClassroomRepository classroomRepository;

    public ClassroomController(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    @GetMapping("")
    List<Classroom> allReservations(){return this.classroomRepository.findAll();}

    @GetMapping("/{id}/availability/{month}/{role}")
    boolean[] classroomAvailabilityByMonth(@PathVariable Long id, @PathVariable int month, @PathVariable String role){
        List<Reservation> classroomReservations = classroomRepository.findTeacherReservationsByMonthAndClassroomId(id, month);

        return setAvailableDays(classroomReservations, month, role);
    }

    private static boolean[] setAvailableDays(List<Reservation> classroomReservations, int month, String role) {
        int[] availableHoursMonthPerDay = initializeAvailableHoursMonth(month);
        boolean[] availableDays = new boolean[YearMonth.of(YearMonth.now().getYear(), month).lengthOfMonth()];

        for (Reservation reservation : classroomReservations){
            availableHoursMonthPerDay[reservation.getReservedDay()-1] -= reservation.getReservedHours();
        }

        if(role.equals("TEACHER")) {
            for (int i = 0; i < availableHoursMonthPerDay.length; i++)
                availableDays[i] = (availableHoursMonthPerDay[i] > 0) ? true : false;
        }else{
            for (int i = 0; i < availableHoursMonthPerDay.length; i++)
                availableDays[i] = (availableHoursMonthPerDay[i] == 12) ? false : true;
        }
        return availableDays;
    }

    private static int[] initializeAvailableHoursMonth(int month) {
        int[] availabilityArray = new int[YearMonth.of(YearMonth.now().getYear(), month).lengthOfMonth()];
        for (int i = 0; i < availabilityArray.length; i++) {
            availabilityArray[i] = 12;
        }
        return availabilityArray;
    }

    @GetMapping("/{id}/availability/{month}/{day}/{role}")
    boolean[] classroomAvailabilityByDay(@PathVariable Long id, @PathVariable int month, @PathVariable int day, @PathVariable String role){
        boolean[] availableHours = initializeAvailableHoursDay(role);

        List<Reservation> teacherReservations = classroomRepository.findTeacherReservationsByDayAndClassroomId(id, month, day);

        return role.equals("TEACHER") ? setTeacherReservedHours(teacherReservations, availableHours) : setStudentReservedHours(teacherReservations, availableHours);
    }

    private boolean[] setStudentReservedHours(List<Reservation> teacherReservations, boolean[] availableHours) {
        for (Reservation reservation : teacherReservations){
            List<Integer> reservedHours = reservation.getIndividualReservedHours();
            for (int reservedHour : reservedHours){
                availableHours[reservedHour-9] = true;
            }
        }
        return availableHours;
    }

    private static boolean[] setTeacherReservedHours(List<Reservation> teacherReservations, boolean[] availableHours) {
        for (Reservation reservation : teacherReservations){
            List<Integer> reservedHours = reservation.getIndividualReservedHours();
            for (int reservedHour : reservedHours){
                availableHours[reservedHour-9] = false;
            }
        }
        return availableHours;
    }
    private static boolean[] initializeAvailableHoursDay(String role) {
        boolean[] availableHours = new boolean[12];
        for (int i = 0; i < availableHours.length; i++) {
            availableHours[i] = role.equals("TEACHER") ? true : false;
        }
        return availableHours;
    }
}
