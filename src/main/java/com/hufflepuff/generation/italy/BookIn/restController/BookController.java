package com.hufflepuff.generation.italy.BookIn.restController;

import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {
    @Autowired
    private AbstractBookRepository repo;


}
