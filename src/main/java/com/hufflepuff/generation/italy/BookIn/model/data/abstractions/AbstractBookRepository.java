package com.hufflepuff.generation.italy.BookIn.model.data.abstractions;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AbstractBookRepository extends GenericRepository<Book> {

    public Iterable<Book> findByTitleContainingAndIsAvailableTrue(String part);
    public Iterable<Book> findByAuthorContainingAndIsAvailableTrue(String partname);
    public Iterable<Book> findByGenresAndIsAvailableTrue(Genre genre);
    public Iterable<Book> findByTagsAndIsAvailableTrue(Tag tag);
    public Iterable<Book> findByPublisherContainingAndIsAvailableTrue(String pubpartname);
    public Optional<Book> findByISBNAndIsAvailableTrue(String isbn);
    public Iterable<Book> findByYearBetweenAndIsAvailableTrue(LocalDate startDate, LocalDate endDate);
    public Iterable<Book> findByLanguageAndIsAvailableTrue (String language);
    public Iterable<Book> findByIsShippableAndIsAvailableTrue (boolean isShippable);
    @Query("SELECT b from Book b WHERE b.location.city = :cityname")
    public Iterable<Book> findByGeoLocationCityAndIsAvailableTrue (String cityname);

    // FARE QUERY PER LA GEOLOCATION
    //@Query
    //public Iterable<Book> findByGeoLocationCoordinatesAndIsAvailableTrue (double latitude, double longitude);
    
    /*@Query("SELECT b from Book b WHERE b.title LIKE :title and b.author LIKE :author and b.genre = :genre and " +
            "b.tag.name IN :tag and b.publisher LIKE :publisher and b.isbn = :isbn and " +
            "b.language = :language and b.isShippable = :isShippable and b.location.city = :cityname and b.year BETWEEN (:startDate and :endDate)")
    Iterable<Book> findBookByNamedParamsAndIsAvailableTrue(
            @Param("title") String title,
            @Param("author") String author,
            @Param("genre") Genre genre,
            @Param("tag") Tag tag,
            @Param("publisher") String publisher,
            @Param("isbn") String isbn,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("language") String language,
            @Param("isShippable") boolean isShippable,
            @Param("cityname") String cityname

    );*/




}
