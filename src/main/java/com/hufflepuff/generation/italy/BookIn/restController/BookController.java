package com.hufflepuff.generation.italy.BookIn.restController;

import com.hufflepuff.generation.italy.BookIn.dtos.BookDto;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractBookRepository;
import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractBookService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.hufflepuff.generation.italy.BookIn.dtos.BookDto.fromEntity;
import static java.util.Arrays.stream;

@RestController
@RequestMapping(value = "api/books")
public class BookController {

    private AbstractBookService service;

    @Autowired
    public BookController(AbstractBookService service){
        this.service = service;
    }

    @GetMapping("{/id}")
    public ResponseEntity<List<BookDto>> findByTitleContaining(@PathVariable String part){
            List<Book> books = (List) service.findByTitleContaining(part);
            if (!books.isEmpty()) {
                return ResponseEntity.ok().body(BookDto.fromEntityList(books));
            }
            return ResponseEntity.notFound().build();
    }

    @GetMapping()
    public ResponseEntity<List<BookDto>> findByAuthorContaining(@PathVariable String partName){
        List<Book> books = (List) service.findByAuthorContaining(partName);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping()
    public ResponseEntity<List<BookDto>> findByGenre(@PathVariable Genre genre){
        List<Book> books = (List) service.findByGenre(genre);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping()
    public ResponseEntity<List<BookDto>> findByTag(@PathVariable Set<Tag> tags){
        List<Book> books = (List) service.findByTag(tags);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping()
    public ResponseEntity<List<BookDto>> findByPublisherContaining(@PathVariable String pubPartName){
        List<Book> books = (List) service.findByPublisherContaining(pubPartName);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping()
    public ResponseEntity<BookDto> findByISBN(@PathVariable String isbn){
        Optional<Book> bookOp = service.findByISBN(isbn);
        return bookOp.map(book -> ResponseEntity.ok().body(BookDto.fromEntity(book))).
                orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> findByYearBetween(@PathVariable LocalDate startDate, @PathVariable LocalDate endDate){
        List<Book> books = (List) service.findByYearBetween(startDate, endDate);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> findByLanguage(@PathVariable String language){
        List<Book> books = (List) service.findByLanguage(language);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> findByIsShippable(@PathVariable boolean isShippable){
        List<Book> books = (List) service.findByIsShippable(isShippable);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> findBookByNamedParams (@PathVariable String part, @PathVariable String partName,
                                                                @PathVariable Genre genre, @PathVariable Set<Tag> tags,
                                                                @PathVariable String pubPartName, @PathVariable String isbn,
                                                                @PathVariable LocalDate startDate, @PathVariable LocalDate endDate,
                                                                @PathVariable String language, @PathVariable boolean isShippable,
                                                                @PathVariable String cityname){
        List<Book> books = (List) service.findBookByNamedParams(part, partName, genre, tags, pubPartName, isbn, startDate, endDate,
                language, isShippable, cityname);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteByID (@PathVariable long id){
        try {
            service.deleteByID(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException IAE) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update (@RequestBody BookDto bookDto,@PathVariable long id){
        if(bookDto.getId() != id){
            return ResponseEntity.badRequest().build();
        }
        Book b = bookDto.toEntity();
            this.service.update(b);
            return ResponseEntity.noContent().build();
    }

}
