package com.hufflepuff.generation.italy.BookIn.model.services.implementations;

import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractTokenRepository;
import com.hufflepuff.generation.italy.BookIn.model.entities.Token;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractLogoutService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements AbstractLogoutService {
   private final AbstractTokenRepository tokenRepo;

   @Override
   public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
      final String authHeader = request.getHeader("Authorization");
      final String jwt;
      if(authHeader == null || !authHeader.startsWith("Bearer ")){
         return;
      }
      jwt = authHeader.substring(7);
      Token storedToken = tokenRepo.findByToken(jwt)
            .orElse(null);
      if(storedToken != null){
         storedToken.setExpired(true);
         storedToken.setRevoked(true);
         tokenRepo.save(storedToken);
         SecurityContextHolder.clearContext();
      }
   }
}
