package com.hufflepuff.generation.italy.BookIn.restController;

import com.hufflepuff.generation.italy.BookIn.dtos.BookDto;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.GenericRepository;
import com.hufflepuff.generation.italy.BookIn.model.entities.Book;
import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;
import com.hufflepuff.generation.italy.BookIn.model.entities.Tag;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractBookService;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractCrudService;
import com.hufflepuff.generation.italy.BookIn.model.services.implementations.GenericCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static java.util.Arrays.stream;

@RestController
@RequestMapping(value = "api/books")
public class BookController {

    private AbstractBookService service;
    private GenericCrudService<Book> serviceCRUD;

    @Autowired
    public BookController(AbstractBookService service, GenericRepository<Book> crudRepoBook){
        this.service = service;
        this.serviceCRUD = new GenericCrudService<>(crudRepoBook);
    }

    @PostMapping()
    public ResponseEntity<BookDto> create(@RequestBody BookDto bookDto){
        Book b = bookDto.toEntity();
        var bookResult = serviceCRUD.create(b);
        BookDto dtoResult = bookDto.fromEntity(bookResult);
        return ResponseEntity.created(URI.create("/api/books/" + bookResult.getId())).body(dtoResult);
    }

    @GetMapping("/search-title/{part}")
    public ResponseEntity<List<BookDto>> findByTitleContainingAndIsAvailableTrue(@PathVariable String part){
            List<Book> books = (List) service.findByTitleContainingAndIsAvailableTrue(part);
            if (!books.isEmpty()) {
                return ResponseEntity.ok().body(BookDto.fromEntityList(books));
            }
            return ResponseEntity.notFound().build();
    }

    @GetMapping("/search-author/{partName}")
    public ResponseEntity<List<BookDto>> findByAuthorContainingAndIsAvailableTrue(@PathVariable String partName){
        List<Book> books = (List) service.findByAuthorContainingAndIsAvailableTrue(partName);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search-genre/{genre}")
    public ResponseEntity<List<BookDto>> findByGenreAndIsAvailableTrue(@PathVariable Genre genre){
        List<Book> books = (List) service.findByGenresAndIsAvailableTrue(genre);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search-tag/{tag}")
    public ResponseEntity<List<BookDto>> findByTagsAndIsAvailableTrue(@PathVariable Tag tag){
        List<Book> books = (List) service.findByTagsAndIsAvailableTrue(tag);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search-publisher/{pubPartName}")
    public ResponseEntity<List<BookDto>> findByPublisherContainingAndIsAvailableTrue(@PathVariable String pubPartName){
        List<Book> books = (List) service.findByPublisherContainingAndIsAvailableTrue(pubPartName);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search-isbn/{isbn}")
    public ResponseEntity<BookDto> findByISBNAndIsAvailableTrue(@PathVariable String isbn){
        Optional<Book> bookOp = service.findByISBNAndIsAvailableTrue(isbn);
        return bookOp.map(book -> ResponseEntity.ok().body(BookDto.fromEntity(book))).
                orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search-year/{startDate}&{endDate}")
    public ResponseEntity<List<BookDto>> findByYearBetweenAndIsAvailableTrue(@PathVariable LocalDate startDate, @PathVariable LocalDate endDate){
        List<Book> books = (List) service.findByYearBetweenAndIsAvailableTrue(startDate, endDate);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search-language/{language}")
    public ResponseEntity<List<BookDto>> findByLanguageAndIsAvailableTrue(@PathVariable String language){
        List<Book> books = (List) service.findByLanguageAndIsAvailableTrue(language);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search-shippable/{isShippable}")
    public ResponseEntity<List<BookDto>> findByIsShippableAndIsAvailableTrue(@PathVariable boolean isShippable){
        List<Book> books = (List) service.findByIsShippableAndIsAvailableTrue(isShippable);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }

   /*@GetMapping
    public ResponseEntity<List<BookDto>> findBookByNamedParamsAndIsAvailableTrue (@RequestParam String part, @RequestParam String partName,
                                                                @RequestParam Genre genre, @RequestParam Tag tag,
                                                                @RequestParam String pubPartName, @RequestParam String isbn,
                                                                @RequestParam LocalDate startDate, @RequestParam LocalDate endDate,
                                                                @RequestParam String language, @RequestParam boolean isShippable,
                                                                @RequestParam String cityname){
        List<Book> books = (List) service.findBookByNamedParamsAndIsAvailableTrue(part, partName, genre, tag,
                pubPartName, isbn, startDate, endDate, language, isShippable, cityname);
        if (!books.isEmpty()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(books));
        }
        return ResponseEntity.notFound().build();
    }*/

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteByID (@PathVariable long id){
        try {
            serviceCRUD.deleteById(id);
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
            serviceCRUD.update(b);
            return ResponseEntity.noContent().build();
    }

}
