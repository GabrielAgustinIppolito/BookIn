package com.hufflepuff.generation.italy.BookIn.dtos;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {
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

    public static BookDto fromEntity(Book b){
        return new BookDto(b.getId(), b.getTitle(), b.getISBN() != null ? b.getISBN() : "",
                b.getYear() != null ? b.getYear().toString() : "", b.getPublisher() != null ? b.getPublisher() : "",
                b.getLanguage(), b.getAuthor(), b.isShippable(), b.getReview() != null ? b.getReview() : "",
                b.isAvailable());
    }

    public Book toEntity(){
        return new Book(id, title, isbn, year == null || year.length() == 0 ? null : LocalDate.parse(year), publisher,
                language, author, isShippable, review, isAvailable, null,null, null, null, null);
    }

    public static List<BookDto> fromEntityList(List<Book> books) {
        List<BookDto> bookDtoList = new ArrayList<>();
        for (Book b : books) {
            bookDtoList.add(fromEntity(b));
        }
        return bookDtoList;
    }

}
