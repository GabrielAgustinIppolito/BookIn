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
        city_id BIGINT NOT NULL,
        email VARCHAR(255) UNIQUE,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        password VARCHAR(255),
        role VARCHAR(255),

        CONSTRAINT PK_user PRIMARY KEY (_user_id),
        CONSTRAINT FK_user_city FOREIGN KEY(city_id)
            REFERENCES city(city_id)
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
        _user_id BIGINT NOT NULL,

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
   token_id BIGINT NOT NULL,
   expired BOOLEAN NOT NULL,
   revoked BOOLEAN NOT NULL,
   token VARCHAR(255),
   token_type VARCHAR(255),
   _user_id BIGINT,
   CONSTRAINT PK_token PRIMARY KEY (token_id),
   CONSTRAINT FK_book_user FOREIGN KEY(_user_id)
               REFERENCES _user(_user_id)
);

CREATE SEQUENCE token_sequence
OWNED BY token.token_id;

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

INSERT INTO public.geolocation(geolocation_id, longitude, latitude)
	VALUES (001, 37.3110710, 13.5768652), (002, 37.3572607, 13.9237678), (003, 38.1156369,13.3612966),
	      (004, 37.5028120, 15.0883146), (005, 42.3506978, 	13.3999338), (006, 40.6372425, 15.8022214),
       (007, 38.9099992, 16.5876779), (008, 40.8399968, 14.2528707), (009, 44.4944456, 11.3492311),
       (010, 45.6536295, 13.7784072), (011, 41.8954656, 12.4823243), (012, 44.4070624, 8.9339889),
       (013, 45.4636707, 9.1881263), (014, 43.6158281, 13.5189447), (015, 41.5600859, 14.6647992),
       (016, 45.0706029, 7.6867102), (017, 41.1260529, 16.8692905), (018, 39.2149029, 9.1094988),
       (019, 43.7687324, 11.2569013), (020, 46.0702531, 11.1216386), (021, 43.1107009, 12.3891720),
       (022, 45.7356745, 7.3190697), (023, 45.4343363, 12.3387844);

INSERT INTO public.city(city_id, name, geolocation_id)
	VALUES (001, 'Agrigento', 001), (002, 'Delia', 002), (003, 'Palermo', 003),
	       (004, 'Catania', 004), (005, 'L Aquila', 005), (006, 'Potenza', 006),
	       (007, 'Catanzaro', 007), (008, 'Napoli', 008), (009, 'Bologna', 009),
	       (010, 'Trieste', 010), (011, 'Roma', 011), (012, 'Genova', 012),
	       (013, 'Milano', 013), (014, 'Ancona', 014), (015, 'Campobasso', 015),
	       (016, 'Torino', 016), (017, 'Bari', 017), (018, 'Cagliari', 018),
	       (019, 'Firenze', 019), (020, 'Trento', 020), (021, 'Perugia', 021),
	       (022, 'Aosta', 022), (023, 'Venezia', 023);