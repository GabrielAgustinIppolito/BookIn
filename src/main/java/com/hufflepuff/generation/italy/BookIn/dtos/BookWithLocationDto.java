package com.hufflepuff.generation.italy.BookIn.dtos;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


//TO-DO Al momento inutile

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookWithLocationDto {
   private long id;
   private String title;
   private String isbn;
   private String year;
   private String publisher;
   private String language;
   private String author;
   private boolean isShippable;
   private String review;
   private boolean isAvailable;

   private long locationId;
   private String city;
   private double latitude;
   private double longitude;

   public static BookWithLocationDto fromEntity(Book b){
      return new BookWithLocationDto(b.getId(), b.getTitle(), b.getISBN() != null ? b.getISBN() : "",
            b.getYear() != null ? b.getYear().toString() : "", b.getPublisher() != null ? b.getPublisher() : "",
            b.getLanguage(), b.getAuthor(), b.isShippable(), b.getReview() != null ? b.getReview() : "",
            b.isAvailable(), b.getLocation().getId(), b.getLocation().getCity(), b.getLocation().getLatitude(),
            b.getLocation().getLongitude());
   }

//   public Book toEntity(){
//      return new Book(id, title, isbn, year == null || year.length() == 0 ? null : LocalDate.parse(year), publisher,
//            language, author, isShippable, review, isAvailable, new GeoLocation(locationId, city, latitude, longitude,
//            null),
//      null, null, null);
//   }
}
