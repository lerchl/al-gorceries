package com.algorceries.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * {@link JpaRepository} for {@link T}s scoped to a household.
 */
@NoRepositoryBean
public interface HouseholdScopedRepository<T> extends JpaRepository<T, UUID> {

    List<T> findAllByHouseholdId(UUID householdId);
}
