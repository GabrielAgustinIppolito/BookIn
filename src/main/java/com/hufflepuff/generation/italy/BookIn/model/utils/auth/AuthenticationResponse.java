package com.hufflepuff.generation.italy.BookIn.model.utils.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponse {

   @JsonProperty("access_token")
   private String accessToken;
   @JsonProperty("refresh_token")
   private String refreshToken;
}
