package com.hufflepuff.generation.italy.BookIn.model.utils.securityConfig;

import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
   private final AbstractUserRepository userRepo;
   //lombok crea magicamente il costruttore e spring magicamente fa iniezione
   @Bean
   public UserDetailsService userDetailsService(){
      return username -> userRepo.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found x_x"));
   }
   @Bean
   public AuthenticationProvider authenticationProvider(){
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
      authProvider.setUserDetailsService(userDetailsService());
      authProvider.setPasswordEncoder(passwordEncoder());
      return authProvider;
   }
   @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
      return  config.getAuthenticationManager();
   }
   @Bean
   public PasswordEncoder passwordEncoder(){
      return new BCryptPasswordEncoder();
   }
}
