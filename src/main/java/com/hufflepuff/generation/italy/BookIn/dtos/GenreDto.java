package com.hufflepuff.generation.italy.BookIn.dtos;

import com.hufflepuff.generation.italy.BookIn.model.entities.Genre;

public class GenreDto {
    private long id;
    private String name;

    public GenreDto(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static GenreDto fromEntity(Genre g) {
        return new GenreDto(g.getId(), g.getName());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
