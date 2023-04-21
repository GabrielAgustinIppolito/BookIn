package com.hufflepuff.generation.italy.BookIn.model.utils.auth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationRequest {

   private String email;
   private String password;
}
