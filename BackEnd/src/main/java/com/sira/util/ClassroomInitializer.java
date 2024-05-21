/**package com.sira.util;

import com.sira.model.Classroom;
import com.sira.repository.ClassroomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ClassroomInitializer implements CommandLineRunner {

    private final ClassroomRepository classroomRepository;

    public ClassroomInitializer(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Precargar algunas aulas
        Classroom classroom1 = new Classroom(null, "Aula 1", "3203", "Normal");
        Classroom classroom2 = new Classroom(null, "Aula 2", "2201", "Laboratorio");
        Classroom classroom3 = new Classroom(null, "Aula 3", "3202", "Sala de conferencias");
        Classroom classroom4 = new Classroom(null, "Aula 4", "3102", "Normal");
        Classroom classroom5 = new Classroom(null, "Aula 5", "3101", "Laboratorio");
        Classroom classroom6 = new Classroom(null, "Aula 6", "4101", "Sala de conferencias");
        Classroom classroom7 = new Classroom(null, "Aula 7", "4202", "Normal");
        Classroom classroom8 = new Classroom(null, "Aula 8", "4103", "Laboratorio");
        Classroom classroom9 = new Classroom(null, "Aula 9", "4201", "Sala de conferencias");

        // Guardar las aulas en la base de datos
        classroomRepository.save(classroom1);
        classroomRepository.save(classroom2);
        classroomRepository.save(classroom3);
        classroomRepository.save(classroom4);
        classroomRepository.save(classroom5);
        classroomRepository.save(classroom6);
        classroomRepository.save(classroom7);
        classroomRepository.save(classroom8);
        classroomRepository.save(classroom9);

        System.out.println("Aulas precargadas en la base de datos.");
    }
}*/

