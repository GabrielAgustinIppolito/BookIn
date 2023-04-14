package com.hufflepuff.generation.italy.BookIn.model.entities;

import io.hypersistence.utils.hibernate.type.basic.PostgreSQLEnumType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Type;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
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
   private String review;
   private GeoLocation location;
   @Enumerated(EnumType.STRING)
   @Column(columnDefinition = "genre")
   @Type(PostgreSQLEnumType.class)
   private Iterable<Genre> genres;
   @ManyToMany(mappedBy = "book", fetch = FetchType.EAGER)
   @JoinColumn(name = "tag_id")
   private Set<Tag> tags;
}
