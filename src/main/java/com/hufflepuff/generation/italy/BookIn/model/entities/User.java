package com.hufflepuff.generation.italy.BookIn.model.entities;

import com.hufflepuff.generation.italy.BookIn.model.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

//@Data
@Getter
@Setter
@Builder // genera uno UserBuilder -> classe ausiliaria che ti permette di creare un utente in modo più flessibile
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User implements UserDetails {

   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
   @SequenceGenerator(name = "user_generator", allocationSize = 1)
   @Column(name = "_user_id")
   private Integer id;
   private String firstname;
   private String lastname;
   private String email;
   private String password;
   private String city; //per la geolocalizzazione

   @Enumerated(EnumType.STRING)
   private Role role;

   @OneToMany(mappedBy = "user")
   private List<Token> tokens;

   @OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE)
   private List<Book> books;

   @Override
   public Collection<? extends GrantedAuthority> getAuthorities() {
      return List.of(new SimpleGrantedAuthority(role.name()));
   }

   @Override
   public String getPassword() {
      return password;
   }

   @Override
   public String getUsername() {
      return email;
   }

   @Override
   public boolean isAccountNonExpired() {
      return true;
   }

   @Override
   public boolean isAccountNonLocked() {
      return true;
   }

   @Override
   public boolean isCredentialsNonExpired() {
      return true;
   }

   @Override
   public boolean isEnabled() {
      return true;
   }
}
