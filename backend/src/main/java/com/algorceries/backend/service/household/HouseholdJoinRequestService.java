package com.algorceries.backend.service.household;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.User;
import com.algorceries.backend.model.household.Household;
import com.algorceries.backend.model.household.HouseholdJoinRequest;
import com.algorceries.backend.repository.household.HouseholdJoinRequestRepository;
import com.algorceries.backend.service.UserService;

import jakarta.transaction.Transactional;

/**
 * {@link Service} for {@link HouseholdJoinRequest household join requests}.
 */
@Service
public class HouseholdJoinRequestService {

    private final HouseholdJoinRequestRepository householdJoinRequestRepository;
    private final UserService userService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdJoinRequestService(
        HouseholdJoinRequestRepository householdJoinRequestRepository,
        UserService userService
    ) {
        this.householdJoinRequestRepository = householdJoinRequestRepository;
        this.userService = userService;
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

    @Transactional(rollbackOn = IllegalStateException.class)
    public void accept(UUID id, UUID userId) {
        handle(id, userId, true);
    }

    @Transactional(rollbackOn = IllegalStateException.class)
    public void reject(UUID id, UUID userId) {
        handle(id, userId, false);
    }

    /**
     * Handles a {@link HouseholdJoinRequest household join request}.
     * @param id the {@link HouseholdJoinRequest household join request's} id
     * @param userId the handling {@link User user's} id
     * @param addUserToHousehold whether to add the {@link HouseholdJoinRequest#user requester} to the {@link Household household}
     * @throws IllegalArgumentException if the {@link HouseholdJoinRequest household join request} or {@link User handler} could not be found
     * @throws IllegalStateException
     * <ul>
     *     <li>if the {@link User handler} is not part of the {@link HouseholdJoinRequest household join request's} {@link Household household}</li>
     *     <li>if the {@link HouseholdJoinRequest#user requester} is already part of a {@link Household household} (unlikely, the join request would be in an illegal state)</li>
     * </ul>
     */
    private void handle(UUID id, UUID userId, boolean addUserToHousehold) {
        var householdJoinRequest = householdJoinRequestRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Household join request"));
        var handler = userService.findById(userId).orElseThrow(() -> new IllegalArgumentException("User"));
        var household = householdJoinRequest.getHousehold();

        if (!handler.getHousehold().equals(household)) {
            throw new IllegalStateException("User is not part of the household of the join request.");
        }

        if (addUserToHousehold) {
            var requesterId = householdJoinRequest.getUser().getId();
            userService.addUserToHousehold(requesterId, household);
        }

        delete(id);
    }

    public void delete(UUID id) {
        householdJoinRequestRepository.deleteById(id);
    }

    public void deleteByUser(UUID userId) {
        householdJoinRequestRepository.deleteByUserId(userId);
    }
}
