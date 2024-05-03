package com.sira.controller;

import com.sira.dto.ReservationDto;
import com.sira.model.Classroom;
import com.sira.model.Reservation;
import com.sira.model.User;
import com.sira.repository.ClassroomRepository;
import com.sira.repository.ReservationRepository;
import com.sira.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReservationController {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ClassroomRepository classroomRepository;

    public ReservationController(ReservationRepository reservationRepository,
                                 UserRepository userRepository,
                                 ClassroomRepository classroomRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.classroomRepository = classroomRepository;
    }

    @GetMapping("/reservations")
    List<Reservation> allReservations(){return this.reservationRepository.findAll();}

    @PostMapping("/reservation")
    ReservationDto newReservation(@RequestBody ReservationDto reservationDto){
        User user = userRepository.findById(reservationDto.getUserId()).orElseThrow(() -> new EntityNotFoundException("Classroom with ID " + reservationDto.getClassroomId() + " not found"));

        Classroom classroom = classroomRepository.findById(reservationDto.getClassroomId()).orElseThrow(() -> new EntityNotFoundException("Classroom with ID " + reservationDto.getClassroomId() + " not found"));

        Reservation newReservation = new Reservation(reservationDto.getStartDate(), reservationDto.getEndDate(), user, classroom);
        reservationRepository.save(newReservation);
        return new ReservationDto(newReservation.getStartDate(), newReservation.getEndDate(), newReservation.getUser().getId(), newReservation.getClassroom().getId());
    }
}
