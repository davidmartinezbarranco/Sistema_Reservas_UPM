package com.sira.service;

import com.sira.dto.ProfessorReservationDto;
import com.sira.dto.ReservationAndClassroomDto;
import com.sira.model.Classroom;
import com.sira.model.ProfessorReservation;
import com.sira.model.User;
import com.sira.repository.ClassroomRepository;
import com.sira.repository.ProfessorReservationRepository;
import com.sira.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProfessorReservationService {


    private final ProfessorReservationRepository professorReservationRepository;
    private final UserRepository userRepository;
    private final ClassroomRepository classroomRepository;
    private final ModelMapper modelMapper;

    public ProfessorReservationService(ProfessorReservationRepository professorReservationRepository, UserRepository userRepository, ClassroomRepository classroomRepository, ModelMapper modelMapper) {
        this.professorReservationRepository = professorReservationRepository;
        this.userRepository = userRepository;
        this.classroomRepository = classroomRepository;
        this.modelMapper = modelMapper;
    }

    public List<ProfessorReservation> getAllReservations() {
        return professorReservationRepository.findAll();
    }

    public ProfessorReservation getReservationById(Long id) {
        return professorReservationRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Reservation not found"));
    }

    public ProfessorReservationDto createReservation(ProfessorReservationDto request) {
        User requestUser = userRepository.findById(request.getUserId()).orElseThrow(() -> new EntityNotFoundException("Classroom with ID " + request.getClassroomId() + " not found"));
        Classroom requestClassroom = classroomRepository.findById(request.getClassroomId()).orElseThrow(() -> new EntityNotFoundException("Classroom with ID " + request.getClassroomId() + " not found"));

        ProfessorReservation reservation = new ProfessorReservation(
                request.getStartDate(),
                request.getEndDate(),
                requestUser,
                requestClassroom,
                request.getTotalCapacity()
        );
        ProfessorReservationDto professorReservationDto = modelMapper.map(professorReservationRepository.save(reservation), ProfessorReservationDto.class);
        professorReservationDto.setTotalCapacity(request.getTotalCapacity());
        return professorReservationDto;
    }

    public ProfessorReservation deleteReservation(Long id){
        ProfessorReservation professorReservation = professorReservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reserva no encontrada"));
        professorReservationRepository.deleteById(id);
        return professorReservation;
    }

    public List<ReservationAndClassroomDto> getReservationsByUserId(Long userId) {
        List<ReservationAndClassroomDto> reservationAndClassroomDtos = new ArrayList<>();
        List<ProfessorReservation> reservations = professorReservationRepository.findAllByUserId(userId);
        for (ProfessorReservation reservation : reservations)
            reservationAndClassroomDtos.add(new ReservationAndClassroomDto(reservation));
        return reservationAndClassroomDtos;
    }
}

