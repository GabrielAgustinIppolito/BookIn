package com.hufflepuff.generation.italy.BookIn.model.services.implementations;

import com.hufflepuff.generation.italy.BookIn.dtos.UserDto;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractUserRepository;
import com.hufflepuff.generation.italy.BookIn.model.entities.User;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractUserService;
import com.hufflepuff.generation.italy.BookIn.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements AbstractUserService {
   @Autowired
   private AbstractUserRepository repo;
   @Autowired
   private JWTUtil jwtUtil;

   @Override
   @PostMapping
   public UserDto saveUser(User user){
      Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
      //iterazioni, uso di memoria, thread, testo da lavorare
      String hash = argon2.hash(1, 1024, 1, user.getPassword());
      user.setPassword(hash);    //sul db così salveremo la password sempre crittografata
      return UserDto.dtoFromEntity(repo.save(user));
   }

   @GetMapping()
   public List<User> getAllUsers(@RequestHeader(value = "Authorization_Admin") String token){
      return !isValidToken(token) ? null : repo.findAll();
   }

   private boolean isValidToken(String token){
      return jwtUtil.getKey(token) != null;
   }

   @RequestMapping(value = "login", method = RequestMethod.POST)
   public String login(@RequestBody User user){
      Optional<User> logged=repo.findUserByEmail(user.getEmail()); //prende l'user con dato id
      return logged.isPresent() ? jwtUtil.create(String.valueOf(logged.get().getId()), //return token
            logged.get().getEmail())
            : null; //se non lo trova
   }
}