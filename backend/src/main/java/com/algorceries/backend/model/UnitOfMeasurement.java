package com.algorceries.backend.model;

import java.util.UUID;

import com.algorceries.backend.model.household.Household;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

/**
 * {@link HouseholdScopedEntity} representing a unit of measurement.
 */
@Entity(name = "algo_unit_of_measurement")
public class UnitOfMeasurement implements HouseholdScopedEntity {

    @Id
    @GeneratedValue
    @Column
    private UUID id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "household_id")
    @JsonIgnore
    private Household household;

    // /////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    // /////////////////////////////////////////////////////////////////////////

    @Override
    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public Household getHousehold() {
        return household;
    }

    @Override
    public void setHousehold(Household household) {
        this.household = household;
    }
}
