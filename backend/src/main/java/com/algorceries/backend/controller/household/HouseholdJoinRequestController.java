package com.algorceries.backend.controller.household;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

import java.util.List;
import java.util.UUID;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.controller.exception.NotFoundException;
import com.algorceries.backend.model.household.HouseholdJoinRequest;
import com.algorceries.backend.security.UserPrincipal;
import com.algorceries.backend.service.UserService;
import com.algorceries.backend.service.household.HouseholdJoinRequestService;
import com.algorceries.backend.service.household.HouseholdService;

/**
 * {@link RestController} for {@link HouseholdJoinRequest household join requests}.
 */
@RestController
@RequestMapping("/households")
public class HouseholdJoinRequestController {

    private final HouseholdJoinRequestService householdJoinRequestService;
    private final HouseholdService householdService;
    private final UserService userService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdJoinRequestController(
        HouseholdJoinRequestService householdJoinRequestService,
        HouseholdService householdService,
        UserService userService
    ) {
        this.householdJoinRequestService = householdJoinRequestService;
        this.householdService = householdService;
        this.userService = userService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping("/join-requests")
    public HouseholdJoinRequest find(UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();
        return householdJoinRequestService.findByUserId(userPrincipal.getUserId()).orElseThrow(NotFoundException::new);
    }

    @GetMapping("/{householdId}/join-requests")
    public List<HouseholdJoinRequest> findByHouseholdId(@PathVariable UUID householdId) {
        return householdJoinRequestService.findByHouseholdId(householdId);
    }

    @PostMapping("/{householdId}/join-requests")
    @ResponseStatus(CREATED)
    public HouseholdJoinRequest create(@PathVariable UUID householdId, UsernamePasswordAuthenticationToken authToken) {
        var household = householdService.findById(householdId).orElseThrow(NotFoundException::new);
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();
        var user = userService.findById(userPrincipal.getUserId()).orElseThrow(NotFoundException::new);

        try {
            return householdJoinRequestService.create(household, user);
        } catch (IllegalArgumentException | IllegalStateException e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    @PostMapping("/join-requests/{joinRequestId}/accept")
    @ResponseStatus(NO_CONTENT)
    public void accept(@PathVariable UUID joinRequestId, UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();
        householdJoinRequestService.accept(joinRequestId, userPrincipal.getUserId());
    }

    @PostMapping("/join-requests/{joinRequestId}/reject")
    @ResponseStatus(NO_CONTENT)
    public void reject(@PathVariable UUID joinRequestId, UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();
        householdJoinRequestService.reject(joinRequestId, userPrincipal.getUserId());
    }

    @DeleteMapping("/join-requests/{joinRequestId}")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable UUID joinRequestId) {
        householdJoinRequestService.delete(joinRequestId);
    }
}
