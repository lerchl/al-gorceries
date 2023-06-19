package com.algorceries.backend.model.household;

import static jakarta.persistence.CascadeType.REMOVE;

import java.util.Set;
import java.util.UUID;

import com.algorceries.backend.model.Dish;
import com.algorceries.backend.model.DishList;
import com.algorceries.backend.model.Ingredient;
import com.algorceries.backend.model.Season;
import com.algorceries.backend.model.UnitOfMeasurement;
import com.algorceries.backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * {@link Entity} representing a household.
 */
@Entity(name = "algo_household")
public class Household {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Column(name = "name", nullable = false)
    @Size(min = 3, max = 100)
    @NotNull
    private String name;

    @OneToMany(mappedBy = "household")
    @JsonManagedReference
    private Set<User> users;

    @OneToMany(mappedBy = "household", cascade = REMOVE)
    @JsonIgnore
    private Set<Ingredient> ingredients;

    @OneToMany(mappedBy = "household", cascade = REMOVE)
    @JsonIgnore
    private Set<UnitOfMeasurement> unitsOfMeasurement;

    @OneToMany(mappedBy = "household", cascade = REMOVE)
    @JsonIgnore
    private Set<Season> seasons;

    @OneToMany(mappedBy = "household", cascade = REMOVE)
    @JsonIgnore
    private Set<Dish> dishes;

    @OneToMany(mappedBy = "household", cascade = REMOVE)
    @JsonIgnore
    private Set<DishList> dishLists;

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Household)) {
            return false;
        }

        var household = (Household) o;
        return id.equals(household.id);
    }

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

    public Set<User> getUsers() {
        return users;
    }
}
