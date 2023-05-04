package com.hufflepuff.generation.italy.BookIn.model.entities;

import com.hufflepuff.generation.italy.BookIn.model.enums.TokenType;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Token {

  @Id
  @GeneratedValue
  @Column(name = "token_id")
  public long id;

  @Column(unique = true)
  public String token;

  @Enumerated(EnumType.STRING)
  public TokenType tokenType = TokenType.BEARER;

  public boolean revoked;

  public boolean expired;

  @ManyToOne(fetch =  FetchType.LAZY)
  @JoinColumn(name = "_user_id")
  public User user;
}
