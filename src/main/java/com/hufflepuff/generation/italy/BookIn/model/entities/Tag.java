package com.hufflepuff.generation.italy.BookIn.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "tag")
public class Tag {
   private long id;
   private String name;
   private String description;
}
