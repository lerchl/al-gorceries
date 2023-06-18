package com.algorceries.backend.service;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.UnitOfMeasurement;
import com.algorceries.backend.repository.HouseholdScopedRepository;
import com.algorceries.backend.repository.household.HouseholdRepository;

/**
 * {@link HouseholdScopedService} for {@link UnitOfMeasurement unit of measurements}.
 */
@Service
public class UnitOfMeasurementService extends HouseholdScopedService<UnitOfMeasurement> {

    public UnitOfMeasurementService(
        HouseholdScopedRepository<UnitOfMeasurement> repository,
        HouseholdRepository householdRepository
    ) {
        super(repository, householdRepository, UnitOfMeasurement.class);
    }
}
