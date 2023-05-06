package com.hufflepuff.generation.italy.BookIn.model.data.abstractions;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface AbstractBookRepository extends GenericRepository<Book> {

    Iterable<Book> findByTitleContainingAndIsAvailableTrue(String part);
    Iterable<Book> findByAuthorContainingAndIsAvailableTrue(String partname);
    Iterable<Book> findByCityId(long id);
    Iterable<Book> findByGenresIdAndCityIdAndIsAvailableTrue(long genreId, long cityId);
    Iterable<Book> findByTagsAndCityIdAndIsAvailableTrue(long tagId, long cityId);
    Iterable<Book> findByPublisherContainingAndIsAvailableTrue(String pubpartname);
    Optional<Book> findByISBNAndIsAvailableTrue(String isbn);
    Iterable<Book> findByYearBetweenAndIsAvailableTrue(LocalDate startDate, LocalDate endDate);
    Iterable<Book> findByLanguageAndIsAvailableTrue (String language);
    Iterable<Book> findByIsShippableAndIsAvailableTrue (boolean isShippable);
    @Query("SELECT b from Book b WHERE b.city.name = :cityname")
    Iterable<Book> findByGeoLocationCityAndIsAvailableTrue (String cityname);

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
