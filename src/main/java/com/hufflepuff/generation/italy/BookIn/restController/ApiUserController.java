package com.hufflepuff.generation.italy.BookIn.restController;

import com.hufflepuff.generation.italy.BookIn.model.entities.User;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractUserRepository;
import com.hufflepuff.generation.italy.BookIn.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/user")
public class ApiUserController {
   @Autowired
   private AbstractUserRepository repo;
   @Autowired
   private JWTUtil jwtUtil;

   @PostMapping
   public void createUser(@RequestBody User user){
      Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
                              //iterazioni, uso di memoria, thread, testo da lavorare
      String hash = argon2.hash(1, 1024, 1, user.getPassword());
      user.setPassword(hash);    //sul db così salveremo la password sempre crittografata
      repo.save(user);
   }

   @GetMapping()
   public List<User> getAllUsers(@RequestHeader(value = "Authorization_Admin") String token){
      return !isValidToken(token) ? null : repo.findAll();
   }

   private boolean isValidToken(String token){
      return jwtUtil.getKey(token) != null;
   }


}
