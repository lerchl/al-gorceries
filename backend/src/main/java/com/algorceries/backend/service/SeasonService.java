package com.algorceries.backend.service;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.Season;
import com.algorceries.backend.repository.SeasonRepository;
import com.algorceries.backend.repository.household.HouseholdRepository;

/**
 * {@link HouseholdScopedService} for {@link Season seasons}.
 */
@Service
public class SeasonService extends HouseholdScopedService<Season> {

    public SeasonService(
        SeasonRepository seasonRepository,
        HouseholdRepository householdRepository
    ) {
        super(seasonRepository, householdRepository, Season.class);
    }
}
