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
 * {@link HouseholdScopedEntity} representing an ingredient.
 */
@Entity(name = "algo_ingredient")
public class Ingredient implements HouseholdScopedEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

	@Column(name = "pantry_staple")
	private boolean pantryStaple;

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

	public boolean isPantryStaple() {
	    return pantryStaple;
	}

	public void setPantryStaple(boolean pantryStaple) {
	    this.pantryStaple = pantryStaple;
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
