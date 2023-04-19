package com.hufflepuff.generation.italy.BookIn.model.services.abstractions;

import com.hufflepuff.generation.italy.BookIn.dtos.UserDto;
import com.hufflepuff.generation.italy.BookIn.model.entities.User;

public interface AbstractUserService {
   UserDto saveUser(User user);
}
