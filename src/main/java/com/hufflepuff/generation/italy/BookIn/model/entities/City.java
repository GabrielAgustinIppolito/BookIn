package com.hufflepuff.generation.italy.BookIn.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "city")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "city_generator", allocationSize = 1)
    @Column(name = "city_id")
    private long id;
    private String name;

    @OneToMany(mappedBy = "city", cascade = CascadeType.DETACH)
    private List<User> users;

    @OneToMany(mappedBy = "city", cascade = CascadeType.DETACH)
    private List<Book> books;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "geolocation_id", referencedColumnName = "geolocation_id", nullable = true)
    private GeoLocation center;
}
