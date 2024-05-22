package com.sira.service;

import com.sira.model.Classroom;
import com.sira.model.ProfessorReservation;
import com.sira.repository.ClassroomRepository;
import com.sira.repository.ProfessorReservationRepository;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.Arrays;
import java.util.List;

@Service
public class ClassroomService {

    private final ClassroomRepository classroomRepository;
    private final ProfessorReservationRepository professorReservationRepository;

    public ClassroomService(ClassroomRepository classroomRepository, ProfessorReservationRepository professorReservationRepository) {
        this.classroomRepository = classroomRepository;
        this.professorReservationRepository = professorReservationRepository;
    }

    public List<Classroom> getAllReservations() {
        return this.classroomRepository.findAll();
    }


    public boolean[] getClassroomProfessorAvailabilityByMonth(Long classroomId, int month, int year) {
        int[] availableHoursMonthPerDay = initializeAvailableHoursMonth(month, year);
        boolean[] availableDays = new boolean[YearMonth.of(year, month).lengthOfMonth()];

        List<ProfessorReservation> professorReservations = this.professorReservationRepository.findProfessorReservationsByClassroomAndMonthAndYear(classroomId, month, year);

        for (ProfessorReservation professorReservation : professorReservations){
            availableHoursMonthPerDay[professorReservation.getReservedDay()-1] -= professorReservation.getReservedHours();
        }
        for (int i = 0; i < availableHoursMonthPerDay.length; i++)
            availableDays[i] = availableHoursMonthPerDay[i] > 0;

        return availableDays;
    }

    public boolean[] getClassroomStudentAvailabilityByMonth(Long classroomId, int month, int year) {
        int[] availableHoursMonthPerDay = new int[YearMonth.of(year, month).lengthOfMonth()];
        Arrays.fill(availableHoursMonthPerDay, 0);
        boolean[] availableDays = new boolean[YearMonth.of(year, month).lengthOfMonth()];

        List<ProfessorReservation> professorReservations = this.professorReservationRepository.findProfessorReservationsByClassroomAndMonthAndYear(classroomId, month, year);

        for (ProfessorReservation professorReservation : professorReservations){
            availableHoursMonthPerDay[professorReservation.getReservedDay()-1] += professorReservation.getAvailableHoursForStudents();
        }
        for (int i = 0; i < availableHoursMonthPerDay.length; i++)
            availableDays[i] = availableHoursMonthPerDay[i] != 0;

        return availableDays;
    }

    public boolean[] getClassroomProfessorAvailabilityByDay(Long classroomId, int day, int month, int year) {
        List<ProfessorReservation> professorReservations = this.professorReservationRepository.findProfessorReservationsByClassroomAndDayAndMonthAndYear(classroomId, day, month, year);
        boolean[] availableHours = initializeAvailableHoursDay("PROFESSOR");
        for (ProfessorReservation professorReservation : professorReservations){
            List<Integer> reservedHours = professorReservation.getIndividualReservedHours();
            for (int reservedHour : reservedHours){
                availableHours[reservedHour-9] = false;
            }
        }
        return availableHours;
    }

    public boolean[] getClassroomStudentAvailabilityByDay(Long classroomId, int day, int month, int year) {
        List<ProfessorReservation> professorReservations = this.professorReservationRepository.findProfessorReservationsByClassroomAndDayAndMonthAndYear(classroomId, day, month, year);
        boolean[] availableHours = initializeAvailableHoursDay("STUDENT");
        for (ProfessorReservation professorReservation : professorReservations){
            List<Integer> availableHoursFromReservation = professorReservation.getAvailableHoursForStudent();
            for (int availableHour : availableHoursFromReservation){
                availableHours[availableHour-9] = true;
            }
        }
        return availableHours;
    }

    private static int[] initializeAvailableHoursMonth(int month, int year) {
        int[] availabilityArray = new int[YearMonth.of(year, month).lengthOfMonth()];
        Arrays.fill(availabilityArray, 12);
        return availabilityArray;
    }

    private static boolean[] initializeAvailableHoursDay(String role) {
        boolean[] availableHours = new boolean[12];
        Arrays.fill(availableHours, role.equals("PROFESSOR"));
        return availableHours;
    }
}
