package com.hufflepuff.generation.italy.BookIn.dtos;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.GeoLocation;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;

import java.time.LocalDate;
import java.util.Set;

public class BookDto {
    private long id;
    private String title;
    private String isbn;
    private LocalDate year;
    private String publisher;
    private String language;
    private String author;
    private boolean isShippable;
    private String review;
    private GeoLocation location;

    public BookDto(long id, String title, String isbn, LocalDate year, String publisher, String language, String author,
                   boolean isShippable, String review, GeoLocation location, Iterable<Genre> genres, Set<Tag> tags) {
        this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.year = year;
        this.publisher = publisher;
        this.language = language;
        this.author = author;
        this.isShippable = isShippable;
        this.review = review;
        this.location = location;
    }

    public static BookDto fromEntity(Book b){
        return new BookDto(b.getId(), b.getTitle(), b.getIsbn(), b.getYear(), b.getPublisher(), b.getLanguage(),
                b.getAuthor(), b.isShippable(), b.getReview(), b.getLocation(), b.getGenres(), b.getTags());


    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getIsbn() {
        return isbn;
    }

    public LocalDate getYear() {
        return year;
    }

    public String getPublisher() {
        return publisher;
    }

    public String getLanguage() {
        return language;
    }

    public String getAuthor() {
        return author;
    }

    public boolean isShippable() {
        return isShippable;
    }

    public String getReview() {
        return review;
    }

    public GeoLocation getLocation() {
        return location;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setYear(LocalDate year) {
        this.year = year;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setShippable(boolean shippable) {
        isShippable = shippable;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public void setLocation(GeoLocation location) {
        this.location = location;
    }
}
