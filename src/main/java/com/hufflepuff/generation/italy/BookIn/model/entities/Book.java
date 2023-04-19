package com.hufflepuff.generation.italy.BookIn.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@Table(name = "book")
public class Book {
   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
   @SequenceGenerator(name = "book_generator", allocationSize = 1)
   private long id;
   private String title;
   private String ISBN;
   private LocalDate year;
   private String publisher;
   private String language;
   private String author;
   private boolean isShippable;
   private String review;
   private boolean isAvailable;
   @OneToOne
   private GeoLocation location;
   @ManyToMany
   @JoinTable(
         name = "book_genre",
         joinColumns = @JoinColumn(name = "book_id"),
         inverseJoinColumns = @JoinColumn(name = "genre_id")
   )
   private Set<Genre> genres;
   @ManyToMany(fetch = FetchType.EAGER)
   @JoinTable(
         name = "book_tag",
         joinColumns = @JoinColumn(name = "book_id"),
         inverseJoinColumns = @JoinColumn(name = "tag_id")
   )
   private Set<Tag> tags;

}
