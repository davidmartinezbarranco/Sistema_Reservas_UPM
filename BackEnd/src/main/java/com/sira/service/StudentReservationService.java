package com.sira.service;

import com.sira.dto.ReservationAndClassroomDto;
import com.sira.dto.StudentReservationDto;
import com.sira.model.Classroom;
import com.sira.model.ProfessorReservation;
import com.sira.model.StudentReservation;
import com.sira.model.User;
import com.sira.repository.ClassroomRepository;
import com.sira.repository.ProfessorReservationRepository;
import com.sira.repository.StudentReservationRepository;
import com.sira.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentReservationService {


    private final StudentReservationRepository studentReservationRepository;
    private final ProfessorReservationRepository professorReservationRepository;
    private final ClassroomRepository classroomRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public StudentReservationService(StudentReservationRepository studentReservationRepository, ProfessorReservationRepository professorReservationRepository, ClassroomRepository classroomRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.studentReservationRepository = studentReservationRepository;
        this.professorReservationRepository = professorReservationRepository;
        this.classroomRepository = classroomRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public List<StudentReservation> getAllReservations() {
        return studentReservationRepository.findAll();
    }

    public StudentReservation getReservationById(Long id) {
        return studentReservationRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reservation not found"));
    }

    public StudentReservationDto createReservation(StudentReservationDto studentRequest, String email) {
        ProfessorReservation professorReservation = professorReservationRepository
                .findOverlappingReservations(studentRequest.getStartDate(), studentRequest.getClassroomId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No hay reservas de profesor a esa hora"));
        if (!professorReservation.isHourAvailable(studentRequest.getHour())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Hora no disponible");
        }
        User requestUser = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with email " + email + " not found"));
        Classroom requestClassroom = classroomRepository.findById(studentRequest.getClassroomId()).orElseThrow(() -> new EntityNotFoundException("Classroom with ID " + studentRequest.getClassroomId() + " not found"));


        StudentReservation reservation = new StudentReservation(
                studentRequest.getStartDate(),
                studentRequest.getEndDate(),
                requestUser,
                requestClassroom,
                professorReservation
        );

        if (reservation.reserveHour()) {
            return modelMapper.map(studentReservationRepository.save(reservation), StudentReservationDto.class);
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Capacidad de reserva excedida");
        }
    }

    public List<ReservationAndClassroomDto> getReservationsByUserEmail(String email) {
        List<ReservationAndClassroomDto> reservationAndClassroomDtos = new ArrayList<>();
        List<StudentReservation> reservations = studentReservationRepository.findAllByUserEmail(email);
        for (StudentReservation reservation : reservations)
            reservationAndClassroomDtos.add(new ReservationAndClassroomDto(reservation));
        return reservationAndClassroomDtos;
    }

    public StudentReservation deleteReservation(Long reservationId, String email) {
        StudentReservation reservation = studentReservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reservation not found"));

        if(!reservation.getUser().getEmail().equals(email))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No puede borrar una reserva que no le pertenezca");

        reservation.releaseHour();
        studentReservationRepository.deleteById(reservationId);
        return reservation;
    }
}

