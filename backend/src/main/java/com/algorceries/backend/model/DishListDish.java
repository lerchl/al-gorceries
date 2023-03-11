package com.algorceries.backend.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

/**
 * {@link Entity} representing a {@link DishList dish list's} {@link Dish dish}.
 */
@Entity(name = "algo_dish_list_dish")
public class DishListDish {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "dish_list_id")
    private DishList dishList;

    @ManyToOne
    @JoinColumn(name = "dish_id")
    private Dish dish;

    @Column(name = "selected")
    private boolean selected = false;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishListDish() {
        // default constructor for jpa
    }

    public DishListDish(Dish dish) {
        this.dish = dish;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    // /////////////////////////////////////////////////////////////////////////

    public UUID getId() {
        return id;
    }

    public DishList getDishList() {
        return dishList;
    }

    public void setDishList(DishList dishList) {
        this.dishList = dishList;
    }

    public Dish getDish() {
        return dish;
    }

    public boolean isSelected() {
        return selected;
    }
}
