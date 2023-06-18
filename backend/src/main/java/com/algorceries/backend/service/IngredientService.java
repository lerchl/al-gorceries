package com.algorceries.backend.service;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.Ingredient;
import com.algorceries.backend.repository.IngredientRepository;
import com.algorceries.backend.repository.household.HouseholdRepository;

/**
 * {@link HouseholdScopedService} for {@link Ingredient ingredients}.
 */
@Service
public class IngredientService extends HouseholdScopedService<Ingredient> {

    public IngredientService(
        IngredientRepository ingredientRepository,
        HouseholdRepository householdRepository
    ) {
        super(ingredientRepository, householdRepository, Ingredient.class);
    }
}
