package com.hufflepuff.generation.italy.BookIn.restController;

import com.hufflepuff.generation.italy.BookIn.dtos.*;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.GenericRepository;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.GenreRepository;
import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.TagRepository;
import com.hufflepuff.generation.italy.BookIn.model.entities.*;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractBookService;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractUserService;
import com.hufflepuff.generation.italy.BookIn.model.services.implementations.AuthenticationService;
import com.hufflepuff.generation.italy.BookIn.model.services.implementations.GenericCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(value = "api/books")
@CrossOrigin
public class BookController {

    private AbstractBookService service;
    private AbstractUserService userService;
    private AuthenticationService authService;
    private GenericCrudService<Book> bookServiceCRUD;
    private GenericCrudService<Tag> tagServiceCRUD;
    private GenericCrudService<Genre> genreServiceCrud;

    @Autowired
    public BookController(AbstractBookService service, AbstractUserService userService, AuthenticationService authService, GenericRepository<Book> crudRepoBook,
                          TagRepository crudRepoTag, GenreRepository crudGenreRepo){
        this.service = service;
        this.userService = userService;
        this.authService = authService;
        this.bookServiceCRUD = new GenericCrudService<>(crudRepoBook);
        this.tagServiceCRUD = new GenericCrudService<>(crudRepoTag);
        this.genreServiceCrud = new GenericCrudService<>(crudGenreRepo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompleteBookDto> findById(@PathVariable long id) {
        Optional<Book> result = bookServiceCRUD.findById(id);
        return result.map(book -> ResponseEntity.ok().body(CompleteBookDto.fromEntity(book)))
              .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/register-new-book")
    public ResponseEntity<BookDto> create(@RequestBody BookWrapper bookWrapper, @AuthenticationPrincipal User user){
        BookDto bdto = bookWrapper.getBookDto();
        Book b = bdto.toEntity();
        b.setOwner(user);
        Set<Genre> genres = GenreDto.fromDtoList(bookWrapper.getGenresDto());
        Set<Tag> tags = TagDto.fromDtoList(bookWrapper.getTagsDto());
        GeoLocation l = bookWrapper.getLocation();
        Book bookResult = service.saveBookWithGenresTagsLocation(b, genres, tags, l);
        BookDto dtoResult = BookDto.fromEntity(bookResult);
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
            bookServiceCRUD.deleteById(id);
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
            bookServiceCRUD.update(b);
            return ResponseEntity.noContent().build();
    }

    @GetMapping("/all-tags")
    public ResponseEntity<List<TagDto>> getAllTags(){
        List<TagDto> result = TagDto.fromEntityList(tagServiceCRUD.findAll());
        return ResponseEntity.ok().body(result);
    }
    @GetMapping("/all-genres")
    public ResponseEntity<List<GenreDto>> getAllGenres(){
        List<GenreDto> result = GenreDto.fromEntityList(genreServiceCrud.findAll());
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDto> getUser(@AuthenticationPrincipal User user){
        return ResponseEntity.ok().body(UserDto.dtoFromEntity(user));
    }

    @GetMapping("/user/books")
    public ResponseEntity<List<BookDto>> getUserBooks(@AuthenticationPrincipal User user){
        Optional<User> owner = userService.findByEmail(user.getEmail());
        if (owner.isPresent()) {
            return ResponseEntity.ok().body(BookDto.fromEntityList(owner.get().getBooks()));
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable long id){
        Optional<User> oU=userService.findUserById(id);
        return oU.isPresent() ? ResponseEntity.ok().body(UserDto.dtoFromEntity(
               oU.get())) : ResponseEntity.notFound().build() ;
    }

}
