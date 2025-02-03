package com.algorceries.backend.repository;

import org.springframework.stereotype.Repository;

import com.algorceries.backend.model.DishGroup;

@Repository
public interface DishGroupRepository extends HouseholdScopedRepository<DishGroup> {
	// noop
}
