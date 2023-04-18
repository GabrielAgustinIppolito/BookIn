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
    public Book create(Book b) {
        return repo.save(b);
    }

    @Override
    public Iterable<Book> findByTitleContaining(String part) {
        return repo.findByTitleContaining(part);
    }

    @Override
    public Iterable<Book> findByAuthorContaining(String partName) {
        return repo.findByAuthorContaining(partName);
    }

    @Override
    public Iterable<Book> findByGenre(Genre genre) {
        return repo.findByGenres(genre);
    }

    @Override
    public Iterable<Book> findByTag(Iterable<Tag> tags) {
        return repo.findByTags(tags);
    }

    @Override
    public Iterable<Book> findByPublisherContaining(String pubPartName) {
        return repo.findByPublisherContaining(pubPartName);
    }

    @Override
    public Optional<Book> findByISBN(String isbn) {
        return repo.findByISBN(isbn);
    }

    @Override
    public Iterable<Book> findByYearBetween(LocalDate startDate, LocalDate endDate) {
        return repo.findByYearBetween(startDate, endDate);
    }

    @Override
    public Iterable<Book> findByLanguage(String language) {
        return repo.findByLanguage(language);
    }

    @Override
    public Iterable<Book> findByIsShippable(boolean isShippable) {
        return repo.findByIsShippable(isShippable);
    }

    @Override
    public Iterable<Book> findByGeoLocationCity(String cityname) {
        return findByGeoLocationCity(cityname);
    }

    @Override
    public Iterable<Book> findByGeoLocationCoordinates(double latitude, double longitude) {
        return null;
    }

    @Override
    public Iterable<Book> findBookByNamedParams(String title, String author, Genre genre, Iterable<Tag> tags,
                                                String publisher, String isbn, LocalDate startDate, LocalDate endDate,
                                                String language, boolean isShippable, String cityname) {
        return repo.findBookByNamedParams(title, author, genre, tags, publisher, isbn, startDate,
                endDate, language, isShippable, cityname);
    }

    @Override
    public void deleteByID(long id) {
        repo.deleteById(id);

    }

    @Override
    public void update(Book b) {
        repo.save(b);

    }
}
