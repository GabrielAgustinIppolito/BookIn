package com.hufflepuff.generation.italy.BookIn.model.entities;

import com.hufflepuff.generation.italy.BookIn.dtos.BookDto;
import com.hufflepuff.generation.italy.BookIn.dtos.GenreDto;
import com.hufflepuff.generation.italy.BookIn.dtos.TagDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public class BookWrapper {
    private BookDto bookDto;
    private Set<GenreDto> genresDto;
    private Set<TagDto> tagsDto;
    GeoLocation location;

    public BookDto getBookDto() {
        return bookDto;
    }

    public Set<GenreDto> getGenresDto() {
        return genresDto;
    }

    public Set<TagDto> getTagsDto() {
        return tagsDto;
    }

    public GeoLocation getLocation() {
        return location;
    }

    public Book bookToUpdate(Book book){

        if(getBookDto().getTitle() != null && getBookDto().getTitle().length()>0) book.setTitle(getBookDto().getTitle());
        if(getBookDto().getIsbn() != null && getBookDto().getIsbn().length()>0) book.setISBN(getBookDto().getIsbn());
        if(getBookDto().getYear() != null && getBookDto().getYear().length()>0) book.setYear(LocalDate.parse(getBookDto().getYear()));
        if(getBookDto().getPublisher() != null && getBookDto().getPublisher().length()>0) book.setPublisher(getBookDto().getPublisher());
        if(getBookDto().getLanguage() != null && getBookDto().getLanguage().length()>0) book.setLanguage(getBookDto().getLanguage());
        if(getBookDto().getAuthor() != null && getBookDto().getAuthor().length()>0) book.setAuthor(getBookDto().getAuthor());
        if(getBookDto().getReview() != null && getBookDto().getReview().length()>0) book.setReview(getBookDto().getReview());
        System.out.println("***************************************************************"+getBookDto().isAvailable());
        book.setAvailable(getBookDto().isAvailable());

        if(getBookDto().isShippable() != true || getBookDto().isShippable() != false){
            book.setShippable(getBookDto().isShippable());
        }
        if(getLocation().getId() >= 0) {
            book.setLocation(getLocation());
        }
        if(getTagsDto() != null){
            book.setTags(TagDto.fromDtoList(getTagsDto()));
        }
        if(getGenresDto() != null){
            book.setGenres(GenreDto.fromDtoList(getGenresDto()));
        }
        return book;
    }
}
