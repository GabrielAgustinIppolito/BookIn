package com.hufflepuff.generation.italy.BookIn.model.services.implementations;

import com.hufflepuff.generation.italy.BookIn.model.entities.Token;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractTokenRepository;
import com.hufflepuff.generation.italy.BookIn.model.enums.TokenType;
import com.hufflepuff.generation.italy.BookIn.model.enums.Role;
import com.hufflepuff.generation.italy.BookIn.model.entities.User;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hufflepuff.generation.italy.BookIn.model.utils.auth.AuthenticationRequest;
import com.hufflepuff.generation.italy.BookIn.model.utils.auth.AuthenticationResponse;
import com.hufflepuff.generation.italy.BookIn.model.utils.auth.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractAuthenticationService {
   private final AbstractUserRepository userRepo;
   private final AbstractTokenRepository tokenRepo;
   private final PasswordEncoder passwordEncoder;
   private final JwtService jwtService;
   private final AuthenticationManager authenticationManager;

   @Override
   public AuthenticationResponse register(RegisterRequest request){
      User user = User.builder()
            .nickname(request.getUsername())
            .email(request.getEmail())
            .password(request.getPassword())
            .role(Role.USER)
            .build();
      User savedUser = userRepo.save(user);
      String  jwtToken= jwtService.generateToken(user);
      String refreshToken = jwtService.generateRefreshToken(user);
      saveUserToken(savedUser, jwtToken);
      return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
   }

   @Override
   public void saveUserToken(User user, String jwtToken){
      Token token = Token.builder()
            .user(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
      tokenRepo.save(token);
   }

   @Override
   public void revokeAllUserTokens(User user){
      List<Token> validUserTokens = tokenRepo.findAllValidTokenByUser(user.getId());
      if(validUserTokens.isEmpty()){
         return;
      }
      validUserTokens.forEach(token ->{
         token.setExpired(true);
         token.setRevoked(true);
      });
   }

   @Override
   public void refreshToken(HttpServletRequest request,
                            HttpServletResponse response) throws IOException {
      final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
      final String refreshToken;
      final String userEmail;
      if(authHeader == null || !authHeader.startsWith("Bearer ")){
         return;
      }
      refreshToken = authHeader.substring(7);
      userEmail = jwtService.extractUsername(refreshToken);
      if(userEmail != null){
         User user = this.userRepo.findByEmail(userEmail)
                                  .orElseThrow();
         if(jwtService.isTokenValid(refreshToken, user)){
            String accessToken = jwtService.generateToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, accessToken);
            AuthenticationResponse authResponse = AuthenticationResponse.builder()
                  .accessToken(accessToken)
                  .refreshToken(refreshToken)
                  .build();
            new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
         }
      }
   }

   @Override
   public AuthenticationResponse authenticate(AuthenticationRequest request){
      authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
      );

      User user = userRepo.findByEmail(request.getEmail())
            .orElseThrow();
      String jwtToken = jwtService.generateToken(user);
      String refreshToken = jwtService.generateRefreshToken(user);
      revokeAllUserTokens(user);
      saveUserToken(user, jwtToken);
      return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();

   }
}
