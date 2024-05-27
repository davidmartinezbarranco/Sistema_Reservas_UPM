package com.sira.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Inheritance
@Entity
@NoArgsConstructor
@AllArgsConstructor
public abstract class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDateTime startDate;

    @NotNull
    private LocalDateTime endDate;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;

    protected Reservation(LocalDateTime startDate, LocalDateTime endDate, User user, Classroom classroom) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.user = user;
        this.classroom = classroom;
    }

    public int getReservedDay() {
        return startDate.getDayOfMonth();
    }

    public int getReservedHours() {
        return Duration.between(startDate, endDate).toHoursPart();
    }

    public List<Integer> getIndividualReservedHours(){
        List<Integer> hoursList = new ArrayList<>();
        for(int i = startDate.getHour(); i < endDate.getHour(); i++){
            hoursList.add(i);
        }
        return hoursList;
    }
}
