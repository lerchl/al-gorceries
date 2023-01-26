package com.algorceries.backend.repository;

import java.util.UUID;

import com.algorceries.backend.model.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@link JpaRepository} for {@link Dish dishes}.
 */
@Repository
public interface DishRepository extends JpaRepository<Dish, UUID> {
    // noop
}
