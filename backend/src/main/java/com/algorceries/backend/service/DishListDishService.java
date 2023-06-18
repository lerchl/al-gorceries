package com.algorceries.backend.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.DishListDish;
import com.algorceries.backend.repository.DishListDishRepository;
import com.algorceries.backend.service.exception.EmptyOptionalException;
import com.algorceries.backend.service.exception.WrongHouseholdException;

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
     * @throws EmptyOptionalException if the {@link DishListDish dish list dish} could not be found
     * @throws WrongHouseholdException if the {@link DishListDish dish list dish} does not belong
     * to the requesting user's household
     * @throws IllegalArgumentException if the amount is negative
     */
    public DishListDish changeAmount(UUID id, int amount, UUID householdId)
            throws EmptyOptionalException, WrongHouseholdException {
        if (amount < 0) {
            throw new IllegalArgumentException("amount");
        }

        var dishListDish = dishListDishRepository.findById(id)
                .orElseThrow(() -> new EmptyOptionalException(DishListDish.class));

        if (!dishListDish.getDishList().getHousehold().getId().equals(householdId)) {
            throw new WrongHouseholdException();
        }

        dishListDish.setAmount(amount);
        return dishListDishRepository.save(dishListDish);
    }
}
