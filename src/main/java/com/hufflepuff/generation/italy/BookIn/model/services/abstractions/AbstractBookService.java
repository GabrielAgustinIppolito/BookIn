package com.hufflepuff.generation.italy.BookIn.model.services.abstractions;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface AbstractBookService {
    Book create (Book b);
    public Iterable<Book> findByTitleContainingAndIsAvailableTrue(String part);
    public Iterable<Book> findByAuthorContainingAndIsAvailableTrue(String partName);
    public Iterable<Book> findByGenreAndIsAvailableTrue(Genre genre);
    public Iterable<Book> findByTagAndIsAvailableTrue(Iterable<Tag> tags);
    public Iterable<Book> findByPublisherContainingAndIsAvailableTrue(String pubPartName);
    public Optional<Book> findByISBNAndIsAvailableTrue(String isbn);
    public Iterable<Book> findByYearBetweenAndIsAvailableTrue(LocalDate startDate, LocalDate endDate);
    public Iterable<Book> findByLanguageAndIsAvailableTrue (String language);
    public Iterable<Book> findByIsShippableAndIsAvailableTrue (boolean isShippable);
    @Query("SELECT b from Book b WHERE b.location.city = :cityname")
    public Iterable<Book> findByGeoLocationCityAndIsAvailableTrue (String cityname);
    @Query
    public Iterable<Book> findByGeoLocationCoordinatesAndIsAvailableTrue (double latitude, double longitude);

    @Query("SELECT b from Book b WHERE b.title LIKE :title and b.author LIKE :author and b.genre = :genre and" +
            "b.tags = :tags and b.publisher LIKE :publisher and b.isbn = :isbn and b.year BETWEEN :startDate and endDate" +
            "b.language = :language and b.isShippable = :isShippable and b.location.city = :cityname")
    Iterable<Book> findBookByNamedParamsAndIsAvailableTrue(
            @Param("title") String title,
            @Param("author") String author,
            @Param("genre") Genre genre,
            @Param("tags") Iterable<Tag> tags,
            @Param("publisher") String publisher,
            @Param("isbn") String isbn,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("language") String language,
            @Param("isShippable") boolean isShippable,
            @Param("cityname") String cityname

    );

    void deleteByID(long id);
    void update (Book b);
}
