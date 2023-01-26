package com.algorceries.backend.repository;

import java.util.UUID;

import com.algorceries.backend.model.UnitOfMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@link JpaRepository} for {@link UnitOfMeasurement units of measurement}.
 */
@Repository
public interface UnitOfMeasurementRepository extends JpaRepository<UnitOfMeasurement, UUID> {
    // noop
}
