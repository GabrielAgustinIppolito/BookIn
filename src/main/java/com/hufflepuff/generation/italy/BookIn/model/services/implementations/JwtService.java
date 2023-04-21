package com.hufflepuff.generation.italy.BookIn.model.services.implementations;

import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractJwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService implements AbstractJwtService {
   @org.springframework.beans.factory.annotation.Value("${application.security.jwt.secret-key}")
   private String secretKey;
   @org.springframework.beans.factory.annotation.Value("${application.security.jwt.expiration}")
   private long jwtExpiration;
   @Value("${application.security.jwt.refresh-token.expiration}")
   private long refreshExpiration;

   @Override
   public String extractUsername(String token){
      return extractClaim(token, Claims::getSubject);
   }
   @Override
   public <T> T extractClaim(String token, Function<Claims, T> claimseResolver){
      final Claims claims = extractAllClaims(token);
      return claimseResolver.apply(claims);
   }
   @Override
   public Claims extractAllClaims(String token) {
      return Jwts
                 .parserBuilder()
                 .setSigningKey(getSignInKey())
                 .build()
                 .parseClaimsJws(token)
                 .getBody();
   }
   @Override
   public Key getSignInKey() {
      byte[] keyBytes = Decoders.BASE64.decode(secretKey);
      return Keys.hmacShaKeyFor(keyBytes);
   }
   @Override
   public String generateToken(UserDetails userDetails) {
      return generateToken(new HashMap<>(), userDetails);
   }
   @Override
   public String generateToken(
         Map<String, Object> extraClaims,
         UserDetails userDetails
   ) {
      return buildToken(extraClaims, userDetails, jwtExpiration);
   }
   @Override
   public String generateRefreshToken(UserDetails userDetails){
      return buildToken(new HashMap<>(), userDetails, refreshExpiration);
   }
   @Override
   public String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration){
      return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.ES256)
            .compact();
   }
   @Override
   public boolean isTokenValid(String token, UserDetails userDetails){
      final String username = extractUsername(token);
      return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
   }
   @Override
   public boolean isTokenExpired(String token){
      return extractExpiration(token).before(new Date());
   }
   @Override
   public Date extractExpiration(String token){
      return extractClaim(token, Claims::getExpiration);
   }
}
