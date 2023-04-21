package com.hufflepuff.generation.italy.BookIn.model.services.implementations;

import com.hufflepuff.generation.italy.BookIn.dtos.UserDto;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractUserRepository;
import com.hufflepuff.generation.italy.BookIn.model.entities.User;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements AbstractUserService {
   @Autowired
   private AbstractUserRepository repo;

   @PostMapping(value = "/login")
   public String login(@RequestBody User user){
      return null;
   }
}