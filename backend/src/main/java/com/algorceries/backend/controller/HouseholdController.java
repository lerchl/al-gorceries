package com.algorceries.backend.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.model.Household;
import com.algorceries.backend.security.UserPrincipal;
import com.algorceries.backend.service.HouseholdService;

import jakarta.validation.Valid;

/**
 * {@link RestController} for {@link Household households}.
 */
@RestController
@RequestMapping("/households")
public class HouseholdController {

    private final HouseholdService householdService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdController(HouseholdService householdService) {
        this.householdService = householdService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @PostMapping
    public ResponseEntity<Household> create(@RequestBody @Valid Household household, UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

        try {
            household = householdService.save(household, userPrincipal.getUserId());
        } catch (IllegalStateException e) {
            throw new BadRequestException("User cannot be in a household when creating a new one.");
        }

        return ResponseEntity.created(URI.create("/households/" + household.getId())).body(household);
    }
}
