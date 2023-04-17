package com.hufflepuff.generation.italy.BookIn.model.data.abstractions;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.GeoLocation;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface AbstractBookRepository extends GenericRepository<Book> {

    Iterable<Book> findAll();
    Book create (Book b);
    public Iterable<Book> findByTitleContaining(String part);
    public Iterable<Book> findByAuthorContaining(String partname);
    public Iterable<Book> findByGenre(Genre genre);
    public Iterable<Book> findByTag(Iterable<Tag> tags);
    public Iterable<Book> findByPublisherContaining(String pubpartname);
    public Iterable<Book> findByISBN(String isbn);
    public Iterable<Book> findByYearBetween(LocalDate startDate, LocalDate endDate);
    public Iterable<Book> findByLanguage (String language);
    public Iterable<Book> findByIsShippable (boolean isShippable);
    @Query("SELECT b from Book b WHERE b.location.city = :cityname")
    public Iterable<Book> findByGeoLocationCity (String cityname);
    @Query
    public Iterable<Book> findByGeoLocationCoordinates (double latitude, double longitude);
    
    @Query("SELECT b from Book b WHERE b.title LIKE :title and b.author LIKE :author and b.genre = :genre and" +
            "b.tags = :tags and b.publisher LIKE :publisher and b.isbn = :isbn and b.year BETWEEN :startDate and endDate" +
            "b.language = :language and b.isShippable = :isShippable")
    Iterable<Book> findBookByNamedParams(
            @Param("title") String title,
            @Param("author") String author,
            @Param("genre") Genre genre,
            @Param("tags") Iterable<Tag> tags,
            @Param("publisher") String publisher,
            @Param("isbn") String isbn,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("language") String language,
            @Param("isShippable") boolean isShippable

    );

    void deleteByID(long id);
    void update (Book b);



}
