package com.hufflepuff.generation.italy.BookIn.model.data.abstractions;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;

import java.time.LocalDate;

public interface AbstractBookRepository extends GenericRepository<Book> {

    public Iterable<Book> findByTitleContaining(String part);
    public Iterable<Book> findByAuthorContaining(String partname);
    public Iterable<Book> findByGenre(Genre genre);
    public Iterable<Book> findByTag(Iterable<Tag> tags);
    public Iterable<Book> findByPublisherContaining(String pubpartname);
    public Iterable<Book> findByISBN(String isbn);
    public Iterable<Book> findByYearBetween(LocalDate starttime, LocalDate endtime);
    public Iterable<Book> findByLanguage (String language);
    public Iterable<Book> findByIsShippable (boolean isShippable);


}
