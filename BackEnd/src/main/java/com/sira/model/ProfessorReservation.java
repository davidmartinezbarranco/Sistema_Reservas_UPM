package com.sira.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ProfessorReservation extends Reservation {

    @OneToMany(mappedBy = "professorReservation", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<StudentReservation> studentReservations;

    private int[] capacityPerHour;

    public ProfessorReservation(LocalDateTime startDate, LocalDateTime endDate, User user, Classroom classroom, int totalCapacity) {
        super(startDate, endDate, user, classroom);
        initializeCapacityPerHour(totalCapacity);
    }

    private void initializeCapacityPerHour(int totalCapacity) {
        int hours = (int) Duration.between(getStartDate(), getEndDate()).toHours();
        this.capacityPerHour = new int[hours];
        for (int i = 0; i < hours; i++) {
            this.capacityPerHour[i] = totalCapacity;
        }
    }

    public boolean reserveHour(int hour) {
        int hourIndex = hour - getStartDate().getHour();
        if (hourIndex >= 0 && hourIndex < capacityPerHour.length && capacityPerHour[hourIndex] > 0) {
            capacityPerHour[hourIndex]--;
            return true;
        }
        return false;
    }

    public void releaseHour(int hour) {
        int hourIndex = hour - getStartDate().getHour();
        if (hourIndex >= 0 && hourIndex < capacityPerHour.length) {
            capacityPerHour[hourIndex]++;
        }
    }

    public boolean isHourAvailable(int hour) {
        int hourIndex = hour - getStartDate().getHour();
        return hourIndex >= 0 && hourIndex < capacityPerHour.length && capacityPerHour[hourIndex] > 0;
    }

    public int getAvailableHoursForStudents(){
        int count = 0;
        for (int capacity : capacityPerHour) {
            if (capacity > 0)
                count++;
        }
        return count;
    }

    public List<Integer> getAvailableHoursForStudent(){
        List<Integer> hoursList = new ArrayList<>();
        for(int i = super.getStartDate().getHour(); i < super.getEndDate().getHour(); i++){
            if(capacityPerHour[i-super.getStartDate().getHour()] > 0)
                hoursList.add(i);
        }
        return hoursList;
    }
}
