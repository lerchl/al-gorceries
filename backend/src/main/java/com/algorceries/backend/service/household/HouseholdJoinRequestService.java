package com.algorceries.backend.service.household;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.household.HouseholdJoinRequest;
import com.algorceries.backend.repository.household.HouseholdJoinRequestRepository;
import com.algorceries.backend.service.UserService;

/**
 * {@link Service} for {@link HouseholdJoinRequest household join requests}.
 */
@Service
public class HouseholdJoinRequestService {

    private final HouseholdJoinRequestRepository householdJoinRequestRepository;
    private final HouseholdService householdService;
    private final UserService userService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdJoinRequestService(
        HouseholdJoinRequestRepository householdJoinRequestRepository,
        HouseholdService householdService,
        UserService userService
    ) {
        this.householdJoinRequestRepository = householdJoinRequestRepository;
        this.householdService = householdService;
        this.userService = userService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public List<HouseholdJoinRequest> findByHouseholdId(UUID householdId) {
        return householdJoinRequestRepository.findByHouseholdId(householdId);
    }

    public HouseholdJoinRequest create(UUID householdId, UUID userId) {
        var household = householdService.findById(householdId);
        var user = userService.findById(userId);

        if (household.isEmpty() || user.isEmpty()) {
            throw new IllegalArgumentException("Household or user does not exist");
        }

        return save(new HouseholdJoinRequest(household.get(), user.get()));
    }

    public HouseholdJoinRequest save(HouseholdJoinRequest householdJoinRequest) {
        return householdJoinRequestRepository.save(householdJoinRequest);
    }
}
