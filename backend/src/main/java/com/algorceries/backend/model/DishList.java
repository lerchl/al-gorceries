package com.algorceries.backend.model;

import static jakarta.persistence.CascadeType.ALL;

import java.util.Set;
import java.util.UUID;

import com.algorceries.backend.model.household.Household;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

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
    @JsonManagedReference
    private Set<DishListDish> dishListDishes;

    @ManyToOne
    @JoinColumn(name = "household_id")
    @JsonIgnore
    private Household household;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishList() {
        // default constructor for jpa
    }

    public DishList(int year, int calendarWeek, Household household) {
        this.year = year;
        this.calendarWeek = calendarWeek;
        this.household = household;
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
