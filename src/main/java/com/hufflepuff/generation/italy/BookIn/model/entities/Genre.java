package com.hufflepuff.generation.italy.BookIn.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "genre")
public class Genre {
   private long id;
   private String name;
}
