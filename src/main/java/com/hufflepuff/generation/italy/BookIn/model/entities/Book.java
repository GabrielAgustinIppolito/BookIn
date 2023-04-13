package com.hufflepuff.generation.italy.BookIn.model.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
public class Book {
   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
   @SequenceGenerator(name = "book_generator", allocationSize = 1)
   private long id;
   private String title;
   private long isbn;
   private LocalDate year;
   private String publisher;
   private String language;
   private String author;
   private boolean isShippable;
   private GeoLocation location;
   private Iterable<Genre> genres;
   private Set<Tag> tags;
}
