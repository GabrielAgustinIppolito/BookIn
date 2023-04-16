package com.hufflepuff.generation.italy.BookIn.model.data.abstractions;

public interface GenericRepository<T> {

    T create(T entity);
}
