package com.hufflepuff.generation.italy.BookIn.model.services.implementations;

import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.UserRepository;
import com.hufflepuff.generation.italy.BookIn.model.entities.User;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Service
public class UserService implements AbstractUserService {
   @Autowired
   private UserRepository repo;

   public Optional<User> findByEmail(String email){
      return repo.findByEmail(email);
   }

}