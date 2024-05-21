package com.sira.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class StudentReservation extends Reservation {

    @NotNull
    @ManyToOne
    @JoinColumn(name = "professor_reservation_id")
    @JsonBackReference
    private ProfessorReservation professorReservation;

    public StudentReservation(@NotNull LocalDateTime startDate,
                              @NotNull LocalDateTime endDate,
                              @NotNull User user, @NotNull Classroom classroom,
                              ProfessorReservation professorReservation) {
        super(startDate, endDate, user, classroom);
        this.professorReservation = professorReservation;
    }

    public boolean reserveHour() {
        return professorReservation.reserveHour(super.getStartDate().getHour());
    }

    public void releaseHour() {
        professorReservation.releaseHour(super.getStartDate().getHour());
    }

    public boolean isHourAvailable() {
        return professorReservation.isHourAvailable(super.getStartDate().getHour());
    }
}
