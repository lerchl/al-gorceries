package com.algorceries.backend.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.DishListDish;
import com.algorceries.backend.repository.DishListDishRepository;

@Service
public class DishListDishService {

    private final DishListDishRepository dishListDishRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishListDishService(DishListDishRepository dishListDishRepository) {
        this.dishListDishRepository = dishListDishRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    /**
     * Change the amount of a {@link DishListDish dish list dish}.
     * @param id the id of the {@link DishListDish dish list dish}
     * @param amount the new amount
     * @return the updated {@link DishListDish dish list dish}
     * @throws IllegalArgumentException if the amount is negative
     * or the {@link DishListDish dish list dish} does not exist
     */
    public DishListDish changeAmount(UUID id, int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("amount");
        }

        var optionalDishListDish = dishListDishRepository.findById(id);

        if (optionalDishListDish.isEmpty()) {
            throw new IllegalArgumentException("id");
        }

        var dishListDish = optionalDishListDish.get();
        dishListDish.setAmount(amount);
        return dishListDishRepository.save(dishListDish);
    }
}
