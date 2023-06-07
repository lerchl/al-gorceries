package com.algorceries.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.algorceries.backend.model.Household;

/**
 * {@link JpaRepository} for {@link Household households}.
 */
@Repository
public interface HouseholdRepository extends JpaRepository<Household, UUID> {
    // noop
}
