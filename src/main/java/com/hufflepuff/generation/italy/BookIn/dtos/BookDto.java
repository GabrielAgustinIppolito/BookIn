package com.hufflepuff.generation.italy.BookIn.dtos;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.GeoLocation;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
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
    private Set<Genre> genres;
    private Set<Tag> tags;
    private String review;
    private boolean isAvailable;
    private GeoLocation location;

    public BookDto(long id, String title, String isbn, LocalDate year, String publisher, String language, String author,
                   boolean isShippable, String review, boolean isAvailable, GeoLocation location, Set<Genre> genres,
                   Set<Tag> tags) {
        this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.year = year;
        this.publisher = publisher;
        this.language = language;
        this.author = author;
        this.isShippable = isShippable;
        this.review = review;
        this.isAvailable = isAvailable;
        this.location = location;
        this.genres = genres;
        this.tags = tags;
    }

    public static BookDto fromEntity(Book b){
        return new BookDto(b.getId(), b.getTitle(), b.getISBN(), b.getYear(), b.getPublisher(), b.getLanguage(),
                b.getAuthor(), b.isShippable(), b.getReview(), b.isAvailable(), b.getLocation(), b.getGenres(), b.getTags());


    }

    public Book toEntity(){
        return new Book(id, title, isbn, year, publisher, language, author, isShippable, review, isAvailable,
                location, genres, tags);
    }

    public static List<BookDto> fromEntityList(List<Book> books) {
        List<BookDto> bookDtoList = new ArrayList<>();
        for (Book b : books) {
            bookDtoList.add(fromEntity(b));
        }
        return bookDtoList;
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
    public boolean isAvailable() {
        return isAvailable;
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

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
