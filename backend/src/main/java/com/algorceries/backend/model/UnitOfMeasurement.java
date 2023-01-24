package com.algorceries.backend.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * {@link Entity} representing a unit of measurement.
 */
@Entity(name = "algo_unit_of_measurement")
public class UnitOfMeasurement {

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
