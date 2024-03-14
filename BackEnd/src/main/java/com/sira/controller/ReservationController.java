package com.sira.controller;

import com.sira.model.Reservation;
import com.sira.repository.ReservationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReservationController {

    private final ReservationRepository reservationRepository;

    public ReservationController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @GetMapping("/reservations")
    List<Reservation> allReservations(){return this.reservationRepository.findAll();}

    @PostMapping("/reservation")
    Reservation newReservation(@RequestBody Reservation reservation){
        return this.reservationRepository.save(reservation);
    }
}
