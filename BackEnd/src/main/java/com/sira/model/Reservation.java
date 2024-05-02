package com.sira.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;

    public int getReservedHours(){
        return Duration.between(startDate, endDate).toHoursPart();
    }

    public int getReservedDay(){
        return startDate.getDayOfMonth();
    }

    public List<Integer> getIndividualReservedHours(){
        List<Integer> hoursList = new ArrayList<>();
        for(int i = startDate.getHour(); i <= endDate.getHour(); i++){
            hoursList.add(i);
        }
        return hoursList;
    }
}
