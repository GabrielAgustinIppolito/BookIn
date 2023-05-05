package com.hufflepuff.generation.italy.BookIn.restController;

import com.hufflepuff.generation.italy.BookIn.dtos.CityDto;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.CityRepository;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.GenericRepository;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.GenreRepository;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.TagRepository;
import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.City;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractBookService;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractUserService;
import com.hufflepuff.generation.italy.BookIn.model.services.implementations.AuthenticationService;
import com.hufflepuff.generation.italy.BookIn.model.services.implementations.GenericCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/public")
@CrossOrigin
public class PublicBookController {
   private GenericCrudService<City> cityServiceCrud;

   @Autowired
   public PublicBookController(CityRepository crudCityRepo){
      this.cityServiceCrud = new GenericCrudService<>(crudCityRepo);
   }
   @GetMapping("/all-cities")
   public ResponseEntity<List<CityDto>> getAllCities(){
      List<CityDto> result = CityDto.fromEntityList(cityServiceCrud.findAll());
      return ResponseEntity.ok().body(result);
   }

}
