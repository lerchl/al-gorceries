package com.algorceries.backend.model;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import static jakarta.persistence.CascadeType.ALL;

/**
 * {@link Entity} representing a dish list.
 */
@Entity(name = "algo_dish_list")
public class DishList {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Column(name = "year")
    private int year;

    @Column(name = "calendar_week")
    private int calendarWeek;

    @OneToMany(mappedBy = "dishList", cascade = ALL)
    private Set<DishListDish> dishListDishes;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishList() {
        // default constructor for jpa
    }

    public DishList(int year, int calendarWeek, Set<DishListDish> dishListDishes) {
        this.year = year;
        this.calendarWeek = calendarWeek;
        this.dishListDishes = dishListDishes;
    }

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

    public Set<DishListDish> getDishListDishes() {
        return dishListDishes;
    }

    public void setDishListDishes(Set<DishListDish> dishListDishes) {
        this.dishListDishes = dishListDishes;
    }
}
