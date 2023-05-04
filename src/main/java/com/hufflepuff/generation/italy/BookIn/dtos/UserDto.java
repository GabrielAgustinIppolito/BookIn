package com.hufflepuff.generation.italy.BookIn.dtos;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.User;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
   private long id;
   private String firstname;
   private String lastname;
   private String email;
   private String city;
   public static UserDto dtoFromEntity(User user){
      return new UserDto(user.getId(), user.getFirstname(), user.getLastname(), user.getEmail(), user.getCity().getName());
   }

}
