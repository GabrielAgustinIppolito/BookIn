package com.hufflepuff.generation.italy.BookIn.restController;

import com.hufflepuff.generation.italy.BookIn.model.data.abstractions.AbstractBookRepository;
import com.hufflepuff.generation.italy.BookIn.model.services.abstractions.AbstractBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {

    private AbstractBookService service;

    @Autowired
    public BookController(AbstractBookService service){
        this.service = service;
    }




}
