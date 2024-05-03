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

    @GetMapping("/{id}/availability/{month}")
    int[] classroomAvailabilityByMonth(@PathVariable Long id, @PathVariable int month){
        int[] availabilityArray = initializeAvailableHoursMonth(month);

        List<Reservation> classroomReservations = classroomRepository.findReservationsByMonthAndClassroomId(id, month);
        for (Reservation reservation : classroomReservations){
            availabilityArray[reservation.getReservedDay()] -= reservation.getReservedHours();
        }
        return availabilityArray;
    }

    @GetMapping("/{id}/availability/{month}/{day}")
    boolean[] classroomAvailabilityByDay(@PathVariable Long id,  @PathVariable int month, @PathVariable int day){
        boolean[] availableHours = initializeAvailableHoursDay();

        List<Reservation> reservations = classroomRepository.findReservationsByDayAndClassroomId(id, month, day);

        return setReservedHours(reservations, availableHours);
    }

    private static boolean[] setReservedHours(List<Reservation> reservations, boolean[] availableHours) {
        for (Reservation reservation : reservations){
            List<Integer> reservedHours = reservation.getIndividualReservedHours();
            for (int reservedHour : reservedHours){
                availableHours[reservedHour-9] = false;
            }
        }
        return availableHours;
    }
    private static boolean[] initializeAvailableHoursDay() {
        boolean[] availableHours = new boolean[12];
        for (int i = 0; i < availableHours.length; i++) {
            availableHours[i] = true;
        }
        return availableHours;
    }

    private static int[] initializeAvailableHoursMonth(int month) {
        int[] availabilityArray = new int[YearMonth.of(YearMonth.now().getYear(), month).lengthOfMonth()];
        for (int i = 0; i < availabilityArray.length; i++) {
            availabilityArray[i] = 12;
        }
        return availabilityArray;
    }
}
