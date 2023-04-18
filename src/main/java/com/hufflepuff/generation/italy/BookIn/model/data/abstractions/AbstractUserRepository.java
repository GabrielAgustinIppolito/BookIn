package com.hufflepuff.generation.italy.BookIn.model.data.abstractions;

import com.hufflepuff.generation.italy.BookIn.model.entities.User;

import java.util.Optional;

public interface AbstractUserRepository extends GenericRepository<User> {
   public Optional<User> findUserByEmail(String email);
}
