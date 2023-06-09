package com.hufflepuff.generation.italy.BookIn.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder //genera codice per creare un bookBuilder
@Table(name = "book")
public class Book {
   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
   @SequenceGenerator(name = "book_generator", allocationSize = 1)
   @Column(name = "book_id")
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

   @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
   @JoinColumn(name = "location_id")
   private GeoLocation location;

   @ManyToOne
   @JoinColumn(name = "city_id", nullable = false)
   private City city;

   @ManyToMany(cascade = CascadeType.MERGE)
   @JoinTable(
         name = "book_genre",
         joinColumns = @JoinColumn(name = "book_id"),
         inverseJoinColumns = @JoinColumn(name = "genre_id", nullable = true)
   )
   private Set<Genre> genres;

   @ManyToMany(cascade = CascadeType.MERGE)
   @JoinTable(
         name = "book_tag",
         joinColumns = @JoinColumn(name = "book_id"),
         inverseJoinColumns = @JoinColumn(name = "tag_id", nullable = true)
   )
   private Set<Tag> tags;

   @ManyToOne
   @JoinColumn(name = "_user_id", nullable = false)
   private User owner;

   public Book(long id, String title, String ISBN, LocalDate year, String publisher, String language, String author,
               boolean isShippable, String review, boolean isAvailable) {
      this.id = id;
      this.title = title;
      this.ISBN = ISBN;
      this.year = year;
      this.publisher = publisher;
      this.language = language;
      this.author = author;
      this.isShippable = isShippable;
      this.review = review;
      this.isAvailable = isAvailable;
   }
}
