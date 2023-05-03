package com.hufflepuff.generation.italy.BookIn.model.services.abstractions;

import com.hufflepuff.generation.italy.BookIn.model.entities.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

public interface AbstractUserService {
    public Optional<User> findByEmail(String email);
    public User save(User user);

   Optional<User> findUserById(long id);
}
