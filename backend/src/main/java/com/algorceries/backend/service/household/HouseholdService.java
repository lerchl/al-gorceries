package com.algorceries.backend.service.household;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.User;
import com.algorceries.backend.model.household.Household;
import com.algorceries.backend.repository.UserRepository;
import com.algorceries.backend.repository.household.HouseholdRepository;
import com.algorceries.backend.service.UserService;

import jakarta.transaction.Transactional;

/**
 * {@link Service} for {@link Household households}.
 */
@Service
public class HouseholdService {

    private final HouseholdRepository householdRepository;
    private final HouseholdJoinRequestService householdJoinRequestService;
    private final UserService userService;
    private final UserRepository userRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdService(
        HouseholdRepository householdRepository, 
        HouseholdJoinRequestService householdJoinRequestService,
        UserService userService,
        UserRepository userRepository
    ) {
        this.householdRepository = householdRepository;
        this.householdJoinRequestService = householdJoinRequestService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public List<Household> findAll() {
        return householdRepository.findAll();
    }

    public Optional<Household> findById(UUID id) {
        return householdRepository.findById(id);
    }

    public Optional<Household> findByUserId(UUID userId) {
        var user = userRepository.findById(userId);

        if (user.isEmpty()) {
            throw new IllegalArgumentException("User does not exist.");
        }

        return Optional.ofNullable(user.get().getHousehold());
    }

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
        householdJoinRequestService.deleteByUser(userId);
        return household;
    }

    public void deleteIfEmpty(UUID id) {
        var household = householdRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Household"));

        if (household.getUsers().isEmpty()) {
            householdRepository.delete(household);
        }
    }
}
