package com.hufflepuff.generation.italy.BookIn.model.services.implementations;

import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractBookRepository;
import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class BookService implements AbstractBookService {

    private AbstractBookRepository repo;

    @Autowired
    public BookService(AbstractBookRepository repo) {
        this.repo = repo;
    }


    @Override
    public Iterable<Book> findByTitleContainingAndIsAvailableTrue(String part) {
        return repo.findByTitleContainingAndIsAvailableTrue(part);
    }

    @Override
    public Iterable<Book> findByAuthorContainingAndIsAvailableTrue(String partName) {
        return repo.findByAuthorContainingAndIsAvailableTrue(partName);
    }

    @Override
    public Iterable<Book> findByGenresAndIsAvailableTrue(Genre genre) {
        return repo.findByGenresAndIsAvailableTrue(genre);
    }

    @Override
    public Iterable<Book> findByTagsAndIsAvailableTrue(Tag tag) {
        return repo.findByTagsAndIsAvailableTrue(tag);
    }

    @Override
    public Iterable<Book> findByPublisherContainingAndIsAvailableTrue(String pubPartName) {
        return repo.findByPublisherContainingAndIsAvailableTrue(pubPartName);
    }

    @Override
    public Optional<Book> findByISBNAndIsAvailableTrue(String isbn) {
        return repo.findByISBNAndIsAvailableTrue(isbn);
    }

    @Override
    public Iterable<Book> findByYearBetweenAndIsAvailableTrue(LocalDate startDate, LocalDate endDate) {
        return repo.findByYearBetweenAndIsAvailableTrue(startDate, endDate);
    }

    @Override
    public Iterable<Book> findByLanguageAndIsAvailableTrue(String language) {
        return repo.findByLanguageAndIsAvailableTrue(language);
    }

    @Override
    public Iterable<Book> findByIsShippableAndIsAvailableTrue(boolean isShippable) {
        return repo.findByIsShippableAndIsAvailableTrue(isShippable);
    }

    @Override
    public Iterable<Book> findByGeoLocationCityAndIsAvailableTrue(String cityname) {
        return findByGeoLocationCityAndIsAvailableTrue(cityname);
    }

    @Override
    public Iterable<Book> findByGeoLocationCoordinatesAndIsAvailableTrue(double latitude, double longitude) {
        return null;
    }

    /*@Override
    public Iterable<Book> findBookByNamedParamsAndIsAvailableTrue(String title, String author, Genre genre, Tag tag,
                                                String publisher, String isbn, LocalDate startDate, LocalDate endDate,
                                                String language, boolean isShippable, String cityname) {
        return repo.findBookByNamedParamsAndIsAvailableTrue(title, author, genre, tag, publisher, isbn, startDate,
                endDate, language, isShippable, cityname);
    }*/

}