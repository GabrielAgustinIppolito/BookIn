package com.hufflepuff.generation.italy.BookIn.model.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "genre")
public class Genre {
   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
   @SequenceGenerator(name = "genre_generator", allocationSize = 1)
   private long id;
   private String name;
   @ManyToMany( fetch = FetchType.EAGER)
   private Set<Book> books;
}
