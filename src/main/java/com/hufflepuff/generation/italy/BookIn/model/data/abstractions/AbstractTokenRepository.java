package com.hufflepuff.generation.italy.BookIn.model.data.abstractions;

import com.hufflepuff.generation.italy.BookIn.model.entities.Token;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AbstractTokenRepository extends GenericRepository<Token>{

   @Query(value = """
                     select t from Token t inner join User u
                     on t.user.id = u.id
                     where u.id = :id and (t.expired = false or t.revoked = false)
                                                                                  """)
   List<Token> findAllValidTokenByUser(Long id);
   Optional<Token> findByToken(String token);
}
