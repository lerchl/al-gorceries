package com.algorceries.backend.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.Household;
import com.algorceries.backend.model.User;
import com.algorceries.backend.repository.HouseholdRepository;

import jakarta.transaction.Transactional;

/**
 * {@link Service} for {@link Household households}.
 */
@Service
public class HouseholdService {

    private final HouseholdRepository householdRepository;
    private final UserService userService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdService(HouseholdRepository householdRepository, UserService userService) {
        this.householdRepository = householdRepository;
        this.userService = userService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    /**
     * Saves a {@link Household household} and sets a {@link User user's} {@link Household household}.
     * @param household the {@link Household household} to save
     * @param userId the {@link User user's} id
     * @return the saved {@link Household household}
     */
    @Transactional(rollbackOn = IllegalStateException.class)
    public Household save(Household household, UUID userId) {
        household = householdRepository.save(household);
        userService.addUserToHousehold(userId, household);
        return household;
    }
}
