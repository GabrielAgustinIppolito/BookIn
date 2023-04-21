package com.hufflepuff.generation.italy.BookIn.model.utils.auth;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
   private String username;
   private String email;
   private String password;
}
