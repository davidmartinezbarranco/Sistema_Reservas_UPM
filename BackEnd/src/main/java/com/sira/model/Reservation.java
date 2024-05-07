package com.sira.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private LocalDateTime startDate;
    @NotNull
    private LocalDateTime endDate;

    @JsonIgnore
    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @NotNull
    @ManyToOne
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;

    public Reservation(LocalDateTime startDate, LocalDateTime endDate, User user, Classroom classroom) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.user = user;
        this.classroom = classroom;
    }

    public int getReservedHours(){
        return Duration.between(startDate, endDate).toHoursPart();
    }

    public int getReservedDay(){
        return startDate.getDayOfMonth();
    }

    public List<Integer> getIndividualReservedHours(){
        List<Integer> hoursList = new ArrayList<>();
        for(int i = startDate.getHour(); i < endDate.getHour(); i++){
            hoursList.add(i);
        }
        return hoursList;
    }
}
