package com.hufflepuff.generation.italy.BookIn.model.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "geolocation")
public class GeoLocation {
   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
   @SequenceGenerator(name = "geolocation_generator", allocationSize = 1)
   private long id;
   private long latitude;
   private long longitude;
}
