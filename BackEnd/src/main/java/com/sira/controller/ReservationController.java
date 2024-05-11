package com.sira.controller;

import com.sira.dto.ReservationAndClassroomDto;
import com.sira.dto.ReservationDto;
import com.sira.model.Classroom;
import com.sira.model.Reservation;
import com.sira.model.User;
import com.sira.repository.ClassroomRepository;
import com.sira.repository.ReservationRepository;
import com.sira.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.websocket.server.PathParam;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/reservations/user/{id}")
    List<ReservationAndClassroomDto> allReservations(@PathVariable Long id){
        List<ReservationAndClassroomDto> reservationAndClassroomDtos = new ArrayList<>();
        List<Reservation> reservations = reservationRepository.findAllByUserId(id);
        for(Reservation reservation : reservations)
            reservationAndClassroomDtos.add(new ReservationAndClassroomDto(reservation));
        return reservationAndClassroomDtos;
    }
    
    @PostMapping("/reservation")
    ReservationDto newReservation(@RequestBody ReservationDto reservationDto){
        User user = userRepository.findById(reservationDto.getUserId()).orElseThrow(() -> new EntityNotFoundException("Classroom with ID " + reservationDto.getClassroomId() + " not found"));

        Classroom classroom = classroomRepository.findById(reservationDto.getClassroomId()).orElseThrow(() -> new EntityNotFoundException("Classroom with ID " + reservationDto.getClassroomId() + " not found"));

        Reservation newReservation = new Reservation(reservationDto.getStartDate(), reservationDto.getEndDate(), user, classroom);
        reservationRepository.save(newReservation);
        return new ReservationDto(newReservation.getStartDate(), newReservation.getEndDate(), newReservation.getClassroom().getId(),  newReservation.getUser().getId());
    }

    @DeleteMapping("/reservation/{id}/delete")
    Reservation newReservation(@PathVariable Long id){
        Optional<Reservation> reservation = reservationRepository.findById(id);
        reservationRepository.deleteById(id);
        return reservation.orElseThrow(() -> new EntityNotFoundException("Classroom with id: "+id+" not found"));
    }
}
