package com.hufflepuff.generation.italy.BookIn.restController;

import com.hufflepuff.generation.italy.BookIn.model.services.implementations.AuthenticationService;
import com.hufflepuff.generation.italy.BookIn.model.utils.auth.AuthenticationRequest;
import com.hufflepuff.generation.italy.BookIn.model.utils.auth.AuthenticationResponse;
import com.hufflepuff.generation.italy.BookIn.model.utils.auth.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
   private final AuthenticationService service;

   @PostMapping("/register")
   public ResponseEntity<AuthenticationResponse> register (@RequestBody RegisterRequest request){
      return ResponseEntity.ok(service.register(request));
   }

   @PostMapping("/authenticate")
   public ResponseEntity<AuthenticationResponse> authenticate (@RequestBody AuthenticationRequest request){
      return ResponseEntity.ok(service.authenticate(request));
   }

   @PostMapping("/refresh-token")
   public void refreshtoken(HttpServletRequest request, HttpServletResponse response) throws Exception {
      service.refreshToken(request, response);
   }
}
