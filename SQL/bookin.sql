DROP TABLE IF EXISTS genre, book, city, book_genre, tag, book_tag, _user, geolocation,
  token CASCADE;

-- create GEOLOCATION table --

CREATE TABLE geolocation(
    geolocation_id BIGINT NOT NULL,
    longitude float(53) NOT NULL,
    latitude float(53) NOT NULL,
    CONSTRAINT PK_geolocation PRIMARY KEY(geolocation_id)
);
CREATE SEQUENCE geolocation_sequence
OWNED BY geolocation.geolocation_id;

-- create CITY table --
CREATE TABLE city (
    city_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    geolocation_id BIGINT NOT NULL,
    CONSTRAINT PK_city PRIMARY KEY(city_id),
    CONSTRAINT FK_city_geolocation FOREIGN KEY (geolocation_id) REFERENCES geolocation(geolocation_id)
);
CREATE SEQUENCE city_sequence
OWNED BY city.city_id;

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


-- create BOOK table --
CREATE TABLE book (
        book_id BIGINT NOT NULL,
        isbn VARCHAR(255),
        author VARCHAR(255),
        is_available BOOLEAN NOT NULL,
        is_shippable BOOLEAN NOT NULL,
        language VARCHAR(255),
        publisher VARCHAR(255),
        review VARCHAR(255),
        title VARCHAR(255),
        year DATE,
        city_id BIGINT,
        location_id BIGINT,
        _user_id INTEGER NOT NULL,

        CONSTRAINT PK_book PRIMARY KEY (book_id),
        CONSTRAINT FK_book_user FOREIGN KEY(_user_id)
        		REFERENCES _user(_user_id),
        CONSTRAINT FK_book_geolocation FOREIGN KEY(location_id)
            REFERENCES geolocation(geolocation_id),
        CONSTRAINT FK_book_city FOREIGN KEY(city_id)
                    REFERENCES city(city_id)
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
    book_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,

    CONSTRAINT PK_book_tag PRIMARY KEY(book_id, tag_id),
    CONSTRAINT FK_book_tag_book FOREIGN KEY(book_id)
                REFERENCES book(book_id),
    CONSTRAINT FK_book_tag_tag FOREIGN KEY(tag_id)
                REFERENCES tag(tag_id)
);


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

INSERT INTO tag (tag_id, name)
    VALUES (0001, 'Surreale'), (0002, 'Provocatorio'), (0003, 'Distopico'), (0004, 'Suspense'), (0005, 'Fantapolitico'),
    (0006, 'Critica Sociale'), (0007, 'Satirico'), (0008, 'LGBTQ+'), (0009, 'Erotico'), (0010, 'Serie/Collana'),
    (0011, 'Memorie'), (0012, 'Viaggi'), (0013, 'Post-Apocalittico'), (0014, 'Mito/Leggenda'), (0015, 'Ispirazione'),
    (0016, 'Grimdark'), (0017, 'Cyberpunk'), (0018, 'Pirati'), (0019, 'Western'), (0020, 'Spazio'), (0021, 'Supereroi'),
    (0022, 'Tragicomico'), (0023, 'Black Humour'), (0024, 'Parodia'), (0025, 'Isekai'), (0026, 'Franco-belga'),
    (0027, 'Light Novel'), (0028, 'Lovecraftiano'), (0029, 'Ricette'), (0030, 'Statistiche'), (0031, 'True crime'),
    (0032, 'Angst'), (0033, 'Libro di testo scolastico'), (0034, 'Protagonista femminile'), (0035, 'Universi paralleli'),
    (0036, 'Epistolare'), (0037, 'Guerra'), (0038, 'Classico della letteratura'), (0039, 'Best seller'), (0040, 'Libro sacro');

INSERT INTO genre (genre_id, name)
    VALUES (001, 'Saggio'), (002, 'Manuale'), (003, 'Reportage'), (004, 'Romanzo'), (005, 'Fantasy'), (006, 'Horror'),
    (007, 'Thriller'), (008, 'Giallo'), (009, 'Fantascienza'), (010, 'Drammatico'), (011, 'Umoristico'), (012, 'Rosa'),
    (013, 'Storico'), (014, 'Avventura'), (015, 'Biografia'), (016, 'Folklore'), (017, 'Poesia'), (018, 'Raccolta Fotografica'),
    (019, 'Graphic Novel'), (020, 'Opera teatrale');


CREATE SEQUENCE token_sequence
OWNED BY token.token_id;