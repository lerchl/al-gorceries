package com.algorceries.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.controller.exception.NotFoundException;
import com.algorceries.backend.model.HouseholdScopedEntity;
import com.algorceries.backend.security.UserPrincipal;
import com.algorceries.backend.service.HouseholdScopedService;
import com.algorceries.backend.service.exception.EmptyOptionalException;
import com.algorceries.backend.service.exception.WrongHouseholdException;

/**
 * Controller for {@link HouseholdScopedEntity household scoped entities}.
 */
public class HouseholdScopedController<T extends HouseholdScopedEntity> {

    private final HouseholdScopedService<T> service;

    private final String requestMapping;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdScopedController(HouseholdScopedService<T> service, String requestMapping) {
        this.service = service;
        this.requestMapping = requestMapping;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping
    public List<T> findAll(UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

        try {
            return service.findAllByHouseholdId(userPrincipal.getHouseholdId());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException();
        }
    }

    @GetMapping("/{id}")
    public T findOne(@PathVariable UUID id, UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

        try {
            return service.findById(id, userPrincipal.getHouseholdId());
        } catch (EmptyOptionalException | WrongHouseholdException e) {
            throw new NotFoundException();
        } catch (IllegalArgumentException e) {
            throw new BadRequestException();
        }
    }

    @PostMapping
    public ResponseEntity<T> create(@RequestBody T t, UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

        try {
            t = service.create(t, userPrincipal.getHouseholdId());
            return ResponseEntity.created(URI.create(requestMapping + "/" + t.getId())).body(t);
        } catch (EmptyOptionalException | IllegalArgumentException e) {
            throw new BadRequestException();
        }
    }

    @PutMapping
    public T update(@RequestBody T t, UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

        try {
            return service.update(t, userPrincipal.getHouseholdId());
        } catch (EmptyOptionalException | WrongHouseholdException e) {
            // also throw NotFoundException if the user does not belong to the household
            // to prevent leaking information
            throw new NotFoundException();
        } catch (IllegalArgumentException e) {
            throw new BadRequestException();
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id, UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

        try {
            service.deleteById(id, userPrincipal.getHouseholdId());
        } catch (EmptyOptionalException | WrongHouseholdException e) {
            // also throw NotFoundException if the user does not belong to the household
            // to prevent leaking information
            throw new NotFoundException();
        } catch (IllegalArgumentException e) {
            throw new BadRequestException();
        }
    }
}
