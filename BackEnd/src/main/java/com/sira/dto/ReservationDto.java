package com.sira.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class ReservationDto {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long classroomId;
    private Long userId;
}
