package com.sira.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProfessorReservationDto {
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private Long classroomId;
        private Long userId;
        private int totalCapacity;
}
    