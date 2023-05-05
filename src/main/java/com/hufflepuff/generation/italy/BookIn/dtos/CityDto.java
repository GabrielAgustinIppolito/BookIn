package com.hufflepuff.generation.italy.BookIn.dtos;

import com.hufflepuff.generation.italy.BookIn.model.entities.City;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityDto {
   private long id;
   private String name;
   private long centerLocationId;

   public static CityDto fromEntity(City c) {
      return new CityDto(c.getId(), c.getName(), c.getCenter().getId());
   }

   public static List<CityDto> fromEntityList(List<City> cityList) {
      ArrayList<CityDto> result = new ArrayList<>();
      for (City c : cityList) {
         result.add(fromEntity(c));
      }
      return result;
   }

}
