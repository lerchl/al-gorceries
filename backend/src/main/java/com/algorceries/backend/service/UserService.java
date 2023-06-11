package com.algorceries.backend.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.User;
import com.algorceries.backend.model.household.Household;
import com.algorceries.backend.repository.UserRepository;

/**
 * {@link Service} for {@link User users}.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    /**
     * Adds a {@link User user} to a {@link Household household}.
     * @param userId the {@link User user's} id
     * @param household the {@link Household household}
     * @throws IllegalStateException if the {@link User user} already has a {@link Household household}
     */
    public void addUserToHousehold(UUID userId, Household household) {
        var user = userRepository.getReferenceById(userId);

        if (user.getHousehold() != null) {
            throw new IllegalStateException("User already has a household.");
        }

        user.setHousehold(household);
        userRepository.save(user);
    }

    public void leaveHousehold(UUID userId) {
        var user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User"));

        if (user.getHousehold() == null) {
            throw new IllegalStateException("User is not part of a household.");
        }

        user.setHousehold(null);
        save(user);
    }
}
