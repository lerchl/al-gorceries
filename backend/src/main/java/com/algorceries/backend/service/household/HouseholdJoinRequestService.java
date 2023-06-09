package com.algorceries.backend.service.household;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.User;
import com.algorceries.backend.model.household.Household;
import com.algorceries.backend.model.household.HouseholdJoinRequest;
import com.algorceries.backend.repository.household.HouseholdJoinRequestRepository;

/**
 * {@link Service} for {@link HouseholdJoinRequest household join requests}.
 */
@Service
public class HouseholdJoinRequestService {

    private final HouseholdJoinRequestRepository householdJoinRequestRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdJoinRequestService(HouseholdJoinRequestRepository householdJoinRequestRepository) {
        this.householdJoinRequestRepository = householdJoinRequestRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public List<HouseholdJoinRequest> findByHouseholdId(UUID householdId) {
        return householdJoinRequestRepository.findByHouseholdId(householdId);
    }

    public Optional<HouseholdJoinRequest> findByUserId(UUID userId) {
        return householdJoinRequestRepository.findByUserId(userId);
    }

    public HouseholdJoinRequest create(Household household, User user) {
        if (user.getHousehold() != null) {
            throw new IllegalStateException("User is already part of a household.");
        }

        if (householdJoinRequestRepository.existsByUser(user)) {
            throw new IllegalStateException("User already has a pending join request.");
        }

        return save(new HouseholdJoinRequest(household, user));
    }

    public HouseholdJoinRequest save(HouseholdJoinRequest householdJoinRequest) {
        return householdJoinRequestRepository.save(householdJoinRequest);
    }

    public void delete(UUID joinRequestId) {
        householdJoinRequestRepository.deleteById(joinRequestId);
    }

    public void deleteByUser(UUID userId) {
        householdJoinRequestRepository.deleteByUserId(userId);
    }
}
