package com.algorceries.backend.repository;

import java.util.List;
import java.util.UUID;

import com.algorceries.backend.model.DishIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@link JpaRepository} for {@link DishIngredient dish ingredients}.
 */
@Repository
public interface DishIngredientRepository extends JpaRepository<DishIngredient, UUID> {

    List<DishIngredient> findByDishId(UUID dishId);
}
