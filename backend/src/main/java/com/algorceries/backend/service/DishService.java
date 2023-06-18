package com.algorceries.backend.service;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.Dish;
import com.algorceries.backend.repository.DishRepository;
import com.algorceries.backend.repository.household.HouseholdRepository;

/**
 * {@link HouseholdScopedService} for {@link Dish dishes}.
 */
@Service
public class DishService extends HouseholdScopedService<Dish> {

    public DishService(
        DishRepository dishRepository,
        HouseholdRepository householdRepository
    ) {
        super(dishRepository, householdRepository, Dish.class);
    }
}
