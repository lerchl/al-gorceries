package com.algorceries.backend.repository.household;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.algorceries.backend.model.household.Household;

/**
 * {@link JpaRepository} for {@link Household households}.
 */
@Repository
public interface HouseholdRepository extends JpaRepository<Household, UUID> {
    // noop
}
