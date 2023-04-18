package com.hufflepuff.generation.italy.BookIn.model.services.implementations;

import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractBookRepository;
import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class BookService implements AbstractBookService {

    private AbstractBookRepository repo;

    @Autowired
    public BookService(AbstractBookRepository repo) {
        this.repo = repo;
    }

    @Override
    public Book create(Book b) {
        return repo.create(b);
    }

    @Override
    public Iterable<Book> findByTitleContaining(String part) {
        return repo.findByTitleContaining(part);
    }

    @Override
    public Iterable<Book> findByAuthorContaining(String partname) {
        return repo.findByAuthorContaining(partname);
    }

    @Override
    public Iterable<Book> findByGenre(Genre genre) {
        return repo.findByGenre(genre);
    }

    @Override
    public Iterable<Book> findByTag(Iterable<Tag> tags) {
        return repo.findByTag(tags);
    }

    @Override
    public Iterable<Book> findByPublisherContaining(String pubpartname) {
        return repo.findByPublisherContaining(pubpartname);
    }

    @Override
    public Iterable<Book> findByISBN(String isbn) {
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
        repo.deleteByID(id);

    }

    @Override
    public void update(Book b) {
        repo.update(b);

    }
}
