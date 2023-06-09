package com.algorceries.backend.controller.household;

import static org.springframework.http.HttpStatus.CREATED;

import java.util.List;
import java.util.UUID;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.model.household.HouseholdJoinRequest;
import com.algorceries.backend.security.UserPrincipal;
import com.algorceries.backend.service.household.HouseholdJoinRequestService;

/**
 * {@link RestController} for {@link HouseholdJoinRequest household join requests}.
 */
@RestController
public class HouseholdJoinRequestController {

    private final HouseholdJoinRequestService householdJoinRequestService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdJoinRequestController(HouseholdJoinRequestService householdJoinRequestService) {
        this.householdJoinRequestService = householdJoinRequestService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping("/households/{householdId}/join-requests")
    public List<HouseholdJoinRequest> findByHouseholdId(@PathVariable UUID householdId) {
        return householdJoinRequestService.findByHouseholdId(householdId);
    }

    @PostMapping("/households{householdId}/join-requests")
    @ResponseStatus(CREATED)
    public HouseholdJoinRequest create(@PathVariable UUID householdId, UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

        try {
            return householdJoinRequestService.create(householdId, userPrincipal.getUserId());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(e.getMessage());
        }
    }
}
