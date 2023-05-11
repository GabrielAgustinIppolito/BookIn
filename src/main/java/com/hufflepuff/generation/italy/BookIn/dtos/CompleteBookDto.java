package com.hufflepuff.generation.italy.BookIn.dtos;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.GeoLocation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompleteBookDto {
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
   private double latitude;
   private double longitude;
   private long ownerId;

   public static CompleteBookDto fromEntity(Book b){
      return new CompleteBookDto(b.getId(), b.getTitle(), b.getISBN() != null ? b.getISBN() : "",
            b.getYear() != null ? b.getYear().toString() : "", b.getPublisher() != null ? b.getPublisher() : "",
            b.getLanguage(), b.getAuthor(), b.isShippable(), b.getReview() != null ? b.getReview() : "",
            b.isAvailable(), b.getLocation().getId(), b.getLocation().getLatitude(),
            b.getLocation().getLongitude(), b.getOwner().getId());
   }
   public static List<CompleteBookDto> fromEntityList(List<Book> books) {
      List<CompleteBookDto> bookDtoList = new ArrayList<>();
      for (Book b : books) {
         bookDtoList.add(fromEntity(b));
      }
      return bookDtoList;
   }
   public Book toEntity(){
      return new Book(id, title, isbn, year == null || year.length() == 0 ? null : LocalDate.parse(year), publisher,
            language, author, isShippable, review, isAvailable, new GeoLocation(locationId,  latitude, longitude),
            null, null, null, null);
   }

}
