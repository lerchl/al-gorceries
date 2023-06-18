package com.algorceries.backend.repository;

import org.springframework.stereotype.Repository;

import com.algorceries.backend.model.Season;

/**
 * {@link HouseholdScopedRepository} for {@link Season seasons}.
 */
@Repository
public interface SeasonRepository extends HouseholdScopedRepository<Season> {
    // noop
}
