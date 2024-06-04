package com.sira.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StudentReservationDto {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long classroomId;
    public int getHour(){
        return startDate.getHour();
    }
}
