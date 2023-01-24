package com.algorceries.backend.model;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

/**
 * {@link Entity} representing a dish list.
 */
@Entity(name = "algo_dish_list")
public class DishList {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "year")
    private int year;

    @Column(name = "calendar_week")
    private int calendarWeek;

    @ManyToMany
    @JoinTable(name = "algo_dish_list_dish")
    private Set<Dish> dishes;

    // /////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    // /////////////////////////////////////////////////////////////////////////

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getCalendarWeek() {
        return calendarWeek;
    }

    public void setCalendarWeek(int calendarWeek) {
        this.calendarWeek = calendarWeek;
    }

    public Set<Dish> getDishes() {
        return dishes;
    }

    public void setDishes(Set<Dish> dishes) {
        this.dishes = dishes;
    }
}
