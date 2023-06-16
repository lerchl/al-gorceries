package com.algorceries.backend.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.service.household.HouseholdService;

@Service
public class UserHouseholdService {

    private final UserService userService;
    private final HouseholdService householdService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public UserHouseholdService(UserService userService, HouseholdService householdService) {
        this.userService = userService;
        this.householdService = householdService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    /**
     * Leave a household and delete it if it is empty.
     * @param userId the user to leave the household
     */
    public void leaveHousehold(UUID userId) {
        var household = userService.leaveHousehold(userId);
        householdService.deleteIfEmpty(household.getId());
    }

}
