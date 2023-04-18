package com.hufflepuff.generation.italy.BookIn.restController;

import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractUserRepository;
import com.hufflepuff.generation.italy.BookIn.model.entities.User;
import com.hufflepuff.generation.italy.BookIn.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController

public class AuthController {
   @Autowired
   private AbstractUserRepository repo;
   @Autowired
   private JWTUtil jwtUtil;

   @RequestMapping(value = "api/login", method = RequestMethod.POST)
   public String login(@RequestBody User user){
      Optional<User> logged=repo.findUserByEmail(user.getEmail()); //prende l'user con dato id
      return logged.isPresent() ? jwtUtil.create(String.valueOf(logged.get().getId()), //return token
                                                            logged.get().getEmail())
                                 : null; //se non lo trova
   }
}
