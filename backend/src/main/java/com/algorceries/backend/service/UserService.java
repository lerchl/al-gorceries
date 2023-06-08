package com.algorceries.backend.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.Household;
import com.algorceries.backend.model.User;
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
            throw new IllegalStateException("User already has a household");
        }

        user.setHousehold(household);
        userRepository.save(user);
    }
}
