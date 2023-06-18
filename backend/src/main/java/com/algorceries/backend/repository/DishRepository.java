package com.algorceries.backend.repository;

import org.springframework.stereotype.Repository;

import com.algorceries.backend.model.Dish;

/**
 * {@link HouseholdScopedRepository} for {@link Dish dishes}.
 */
@Repository
public interface DishRepository extends HouseholdScopedRepository<Dish> {
    // noop
}
