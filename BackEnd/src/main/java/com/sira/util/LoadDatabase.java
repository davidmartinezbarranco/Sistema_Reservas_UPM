package com.sira.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sira.model.User;
import com.sira.repository.UserRepository;

@Configuration
class LoadDatabase{

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    // CommandLineRunner bean to initialize the database with sample data and will be executed on application startup
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {

        return args -> {
            log.info("Preloading user 1" + userRepository.save(new User("david", "david@gmail.com")));
            log.info("Preloading user 2" + userRepository.save(new User("pedro", "pedro@gmail.com")));
        };
    }
}
