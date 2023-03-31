package com.algorceries.backend.repository;

import java.util.UUID;

import com.algorceries.backend.model.DishListDish;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * {@link JpaRepository} for {@link DishListDish dish list dishes}.
 */
public interface DishListDishRepository extends JpaRepository<DishListDish, UUID> {
    // noop
}
