package com.algorceries.backend.repository;

import java.util.UUID;

import com.algorceries.backend.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@link JpaRepository} for {@link Ingredient}
 */
@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, UUID> {
    // noop
}
