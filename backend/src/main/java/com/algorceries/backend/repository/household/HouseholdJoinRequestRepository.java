package com.algorceries.backend.repository.household;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.algorceries.backend.model.User;
import com.algorceries.backend.model.household.HouseholdJoinRequest;

/**
 * {@link JpaRepository} for {@link HouseholdJoinRequest household join requests}.
 */
@Repository
public interface HouseholdJoinRequestRepository extends JpaRepository<HouseholdJoinRequest, UUID> {

    List<HouseholdJoinRequest> findByHouseholdId(UUID householdId);
    Optional<HouseholdJoinRequest> findByUserId(UUID userId);
    boolean existsByUser(User user);
    void deleteByUserId(UUID userId);
}
