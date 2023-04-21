package com.hufflepuff.generation.italy.BookIn.dtos;

import com.hufflepuff.generation.italy.BookIn.model.entities.User;
import lombok.*;

@Data
@AllArgsConstructor
public class UserDto {
   private String nickname;
   private String email;
   public static UserDto dtoFromEntity(User user){
      return new UserDto(user.getNickname(), user.getEmail());
   }

}
