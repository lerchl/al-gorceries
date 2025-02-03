package com.algorceries.backend.service;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.DishGroup;
import com.algorceries.backend.repository.DishGroupRepository;
import com.algorceries.backend.repository.household.HouseholdRepository;

@Service
public class DishGroupService extends HouseholdScopedService<DishGroup> {

	public DishGroupService(
		DishGroupRepository dishGroupRepository,
		HouseholdRepository householdRepository
	) {
		super(dishGroupRepository, householdRepository, DishGroup.class);
	}
}
