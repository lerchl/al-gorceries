package com.algorceries.backend.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * {@link Entity} representing an ingridient.
 */
@Entity(name = "algo_ingridient")
public class Ingridient {

    @Id
    @Column
    private UUID id;

    @Column(name = "name")
    private String name;

    // /////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    // /////////////////////////////////////////////////////////////////////////

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
