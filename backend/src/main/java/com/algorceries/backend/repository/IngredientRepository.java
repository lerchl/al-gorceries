package com.algorceries.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.algorceries.backend.model.Ingredient;

/**
 * {@link JpaRepository} for {@link Ingredient ingredients}.
 */
public interface IngredientRepository extends HouseholdScopedRepository<Ingredient> {
    // noop
}
