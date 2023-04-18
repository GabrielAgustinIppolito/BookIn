package com.hufflepuff.generation.italy.BookIn.model.data.abstractions;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface AbstractBookRepository extends GenericRepository<Book> {

    public Iterable<Book> findByTitleContaining(String part);
    public Iterable<Book> findByAuthorContaining(String partname);
    public Iterable<Book> findByGenres(Genre genre);
    public Iterable<Book> findByTags(Iterable<Tag> tags);
    public Iterable<Book> findByPublisherContaining(String pubpartname);
    public Optional<Book> findByISBN(String isbn);
    public Iterable<Book> findByYearBetween(LocalDate startDate, LocalDate endDate);
    public Iterable<Book> findByLanguage (String language);
    public Iterable<Book> findByIsShippable (boolean isShippable);
    @Query("SELECT b from Book b WHERE b.location.city = :cityname")
    public Iterable<Book> findByGeoLocationCity (String cityname);
    @Query
    public Iterable<Book> findByGeoLocationCoordinates (double latitude, double longitude);
    
    @Query("SELECT b from Book b WHERE b.title LIKE :title and b.author LIKE :author and b.genre = :genre and " +
            "b.tags = :tags and b.publisher LIKE :publisher and b.isbn = :isbn and b.year " +
            "b.language = :language and b.isShippable = :isShippable and b.location.city = :cityname BETWEEN :startDate and :endDate")
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
            @Param("isShippable") boolean isShippable,
            @Param("cityname") String cityname

    );
}
