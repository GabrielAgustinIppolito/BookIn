DROP TABLE IF EXISTS genre, book, book_genre, tag, book_tag, _user, geolocation,
  token CASCADE;


-- create USER table --
CREATE TABLE _user (
        _user_id INTEGER NOT NULL,
        city VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        password VARCHAR(255),
        role VARCHAR(255),

        CONSTRAINT PK_user PRIMARY KEY (_user_id)
    );
CREATE SEQUENCE _user_sequence
OWNED BY _user._user_id;

-- create GEOLOCATION table --

CREATE TABLE geolocation(
    geolocation_id BIGINT NOT NULL,
    city VARCHAR(255),
    longitude float(53) NOT NULL,
    latitude float(53) NOT NULL,
    CONSTRAINT PK_geolocation PRIMARY KEY(geolocation_id)
);
CREATE SEQUENCE geolocation_sequence
OWNED BY geolocation.geolocation_id;

-- create BOOK table --
CREATE TABLE book (
        book_id bigint NOT NULL,
        isbn VARCHAR(255),
        author VARCHAR(255),
        is_available boolean NOT NULL,
        is_shippable boolean NOT NULL,
        language VARCHAR(255),
        publisher VARCHAR(255),
        review VARCHAR(255),
        title VARCHAR(255),
        year DATE,
        location_id bigint,
        _user_id INTEGER NOT NULL,

        CONSTRAINT PK_book PRIMARY KEY (book_id),
        CONSTRAINT FK_book_user FOREIGN KEY(_user_id)
        		REFERENCES _user(_user_id),
        CONSTRAINT FK_book_geolocation FOREIGN KEY(location_id)
            REFERENCES geolocation(geolocation_id)
    );
CREATE SEQUENCE book_sequence
OWNED BY book.book_id;

-- create GENRE table --
CREATE TABLE genre(
    genre_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,

    CONSTRAINT PK_genre PRIMARY KEY(genre_id)
);

CREATE SEQUENCE genre_sequence
OWNED BY genre.genre_id;

-- create TAG table --
CREATE TABLE tag(
    tag_id BIGINT NOT NULL,
    description VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    CONSTRAINT PK_tag PRIMARY KEY(tag_id)
);

CREATE SEQUENCE tag_sequence
OWNED BY tag.tag_id;

-- create BOOK_TAG table --
CREATE TABLE book_tag(
--    book_tag_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,

    CONSTRAINT PK_book_tag PRIMARY KEY(book_id, tag_id),
    CONSTRAINT FK_book_tag_book FOREIGN KEY(book_id)
                REFERENCES book(book_id),
    CONSTRAINT FK_book_tag_tag FOREIGN KEY(tag_id)
                REFERENCES tag(tag_id)
);

--CREATE SEQUENCE book_tag_sequence
--OWNED BY book_tag.book_tag_id;

-- create BOOK_GENRE table --
CREATE TABLE book_genre(
    book_id BIGINT NOT NULL,
    genre_id BIGINT NOT NULL,

    CONSTRAINT PK_book_genre PRIMARY KEY(book_id, genre_id),
    CONSTRAINT FK_book_genre_book FOREIGN KEY(book_id)
                REFERENCES book(book_id),
    CONSTRAINT FK_book_genre_genre FOREIGN KEY(genre_id)
                REFERENCES genre(genre_id)
);
--CREATE SEQUENCE book_genre_sequence
--OWNED BY book_genre.book_genre_id;

-- create TOKEN table --
CREATE TABLE token (
   token_id INTEGER NOT NULL,
   expired boolean NOT NULL,
   revoked boolean NOT NULL,
   token VARCHAR(255),
   token_type VARCHAR(255),
   _user_id INTEGER,
   CONSTRAINT PK_token PRIMARY KEY (token_id),
   CONSTRAINT FK_book_user FOREIGN KEY(_user_id)
               REFERENCES _user(_user_id)
);
CREATE SEQUENCE token_sequence
OWNED BY token.token_id;