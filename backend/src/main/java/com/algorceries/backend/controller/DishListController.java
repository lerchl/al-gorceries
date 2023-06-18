package com.algorceries.backend.controller;

import static org.springframework.http.HttpStatus.CREATED;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.controller.exception.ConflictException;
import com.algorceries.backend.controller.exception.NotFoundException;
import com.algorceries.backend.model.DishList;
import com.algorceries.backend.security.UserPrincipal;
import com.algorceries.backend.service.DishListService;
import com.algorceries.backend.service.exception.DuplicateDishListException;
import com.algorceries.backend.service.exception.EmptyOptionalException;
import com.algorceries.backend.service.exception.NoHouseholdException;

/**
 * {@link RestController} for {@link DishList dish lists}.
 */
@RestController
@RequestMapping("/dishLists")
public class DishListController {

    private final DishListService dishListService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishListController(DishListService dishListService) {
        this.dishListService = dishListService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping("/{year}/{calendarWeek}")
    public DishList findByYearAndCalendarWeek(@PathVariable int year,
                                              @PathVariable int calendarWeek,
                                              UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

        try {
            return dishListService.findByYearAndCalendarWeek(year, calendarWeek, userPrincipal.getHouseholdId());
        } catch (EmptyOptionalException e) {
            throw new NotFoundException();
        }
    }

    @PostMapping("/{year}/{calendarWeek}")
    @ResponseStatus(CREATED)
    public DishList create(@PathVariable int year,
                           @PathVariable int calendarWeek,
                           UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

        try {
            return dishListService.create(year, calendarWeek, userPrincipal.getHouseholdId());
        } catch (EmptyOptionalException | NoHouseholdException e) {
            throw new BadRequestException("User must be part of a household.");
        } catch (DuplicateDishListException e) {
            throw new ConflictException(String.format("Dish list for week %d of %d already exists.", calendarWeek, year));
        }
    }
}
