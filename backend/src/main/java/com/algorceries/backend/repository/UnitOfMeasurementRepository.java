package com.algorceries.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.algorceries.backend.model.UnitOfMeasurement;

/**
 * {@link JpaRepository} for {@link UnitOfMeasurement units of measurement}.
 */
@Repository
public interface UnitOfMeasurementRepository extends HouseholdScopedRepository<UnitOfMeasurement> {
    // noop
}
