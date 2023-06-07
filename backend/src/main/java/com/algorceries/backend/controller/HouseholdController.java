package com.algorceries.backend.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.model.Household;
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
    public ResponseEntity<Household> create(@RequestBody @Valid Household household) {
        household = householdService.save(household);
        return ResponseEntity.created(URI.create("/households/" + household.getId())).body(household);
    }
}
