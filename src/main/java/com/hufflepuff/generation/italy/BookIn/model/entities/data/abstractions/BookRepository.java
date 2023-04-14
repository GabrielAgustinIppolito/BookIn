package com.hufflepuff.generation.italy.BookIn.model.entities.data.abstractions;

import com.hufflepuff.generation.italy.BookIn.model.entities.Book;

public interface BookRepository extends GenericRepository<Book>{
    Iterable<Book> findByTitleContains(String part);
    Iterable<Book> findByAuthorContains(String partName);

}
