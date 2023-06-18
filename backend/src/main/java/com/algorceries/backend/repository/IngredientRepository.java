package com.algorceries.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.algorceries.backend.model.Ingredient;

/**
 * {@link JpaRepository} for {@link Ingredient ingredients}.
 */
public interface IngredientRepository extends JpaRepository<Ingredient, UUID>, HouseholdScopedRepository<Ingredient> {
    // noop
}
