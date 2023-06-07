package com.algorceries.backend.service;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.Household;
import com.algorceries.backend.repository.HouseholdRepository;

/**
 * {@link Service} for {@link Household households}.
 */
@Service
public class HouseholdService {

    private final HouseholdRepository householdRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdService(HouseholdRepository householdRepository) {
        this.householdRepository = householdRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public Household save(Household household) {
        return householdRepository.save(household);
    }
}
