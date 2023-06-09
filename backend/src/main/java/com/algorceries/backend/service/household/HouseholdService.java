package com.algorceries.backend.service.household;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.User;
import com.algorceries.backend.model.household.Household;
import com.algorceries.backend.repository.household.HouseholdRepository;
import com.algorceries.backend.service.UserService;

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

    public List<Household> findAll() {
        return householdRepository.findAll();
    }

    public Optional<Household> findById(UUID id) {
        return householdRepository.findById(id);
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
        return household;
    }
}
