package com.hufflepuff.generation.italy.BookIn.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "geolocation")
public class GeoLocation {
   private long id;
   private String city;
   private double latitude;
   private double longitude;

}
