package com.algorceries.backend.model;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

/**
 * {@link Entity} representing a dish.
 */
@Entity(name = "algo_dish")
public class Dish {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "source")
    private String source;

    @Column(name = "time")
    private int time;

    @Column(name = "cost")
    private double cost;

    @OneToMany(mappedBy = "dish")
    private Set<DishIngredient> dishIngredients;

    @ManyToMany
    @JoinTable(name = "algo_dish_season",
               joinColumns = @JoinColumn(name = "dish_id"),
               inverseJoinColumns = @JoinColumn(name = "season_id"))
    private Set<Season> seasons;

    // /////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    // /////////////////////////////////////////////////////////////////////////

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Set<DishIngredient> getDishIngredients() {
        return dishIngredients;
    }

    public void setDishIngredients(Set<DishIngredient> dishIngredients) {
        this.dishIngredients = dishIngredients;
    }

    public Set<Season> getSeasons() {
        return seasons;
    }

    public void setSeasons(Set<Season> seasons) {
        this.seasons = seasons;
    }
}
