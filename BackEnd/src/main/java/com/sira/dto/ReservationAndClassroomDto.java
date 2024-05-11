package com.sira.dto;

import com.sira.model.Classroom;
import com.sira.model.Reservation;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationAndClassroomDto {
    private Long id;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Classroom classroom;
    private Long userId;

    public ReservationAndClassroomDto(Reservation reservation) {
        this.id = reservation.getId();
        this.startDate = reservation.getStartDate();
        this.endDate = reservation.getEndDate();
        this.classroom = reservation.getClassroom();
        this.userId = reservation.getUser().getId();
    }
}
