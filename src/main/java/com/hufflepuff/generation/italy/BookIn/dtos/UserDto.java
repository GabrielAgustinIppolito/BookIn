package com.hufflepuff.generation.italy.BookIn.dtos;

import com.hufflepuff.generation.italy.BookIn.model.entities.User;
import lombok.*;

@Data
@AllArgsConstructor
public class UserDto {
   private long id;
   private String username;
   private String email;
   public static UserDto dtoFromEntity(User user){
      return new UserDto(user.getId(), user.getUsername(), user.getEmail());
   }

   public User getEntityFromDto() {
      return new User(0, this.u);
   }
}
