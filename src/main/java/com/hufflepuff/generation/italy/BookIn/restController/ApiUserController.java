package com.hufflepuff.generation.italy.BookIn.restController;

import com.hufflepuff.generation.italy.BookIn.dtos.UserDto;
import com.hufflepuff.generation.italy.BookIn.model.entities.User;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractCrudService;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/user")
public class ApiUserController {
   private AbstractUserService userService;
   private AbstractCrudService<User> crudService;

   @Autowired
   public ApiUserController(AbstractUserService userService, AbstractCrudService<User> crudService){
      this.userService = userService;
      this.crudService = crudService;
   }
   @PostMapping
   public ResponseEntity<UserDto> createUser(@RequestBody User user){
//      return ResponseEntity(userService.(user));
      return null;
   }
}
