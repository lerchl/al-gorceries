package com.algorceries.backend.model;

import java.util.Set;
import java.util.UUID;

import com.algorceries.backend.model.household.Household;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity(name = "algo_dish_group")
public class DishGroup implements HouseholdScopedEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

	@ManyToMany
	@JoinTable(
		name = "algo_dish_group_dish",
		joinColumns = @JoinColumn(name = "dish_group_id"),
		inverseJoinColumns = @JoinColumn(name = "dish_id")
	)
	private Set<Dish> dishes;

    @ManyToOne
    @JoinColumn(name = "household_id")
    @JsonIgnore
    private Household household;

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

	public Set<Dish> getDishes() {
	    return dishes;
	}

	public void setDishes(Set<Dish> dishes) {
	    this.dishes = dishes;
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
