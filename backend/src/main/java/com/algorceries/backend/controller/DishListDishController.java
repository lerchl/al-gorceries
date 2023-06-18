package com.algorceries.backend.controller;

import java.util.UUID;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.controller.exception.NotFoundException;
import com.algorceries.backend.dto.DishListDishAmountDTO;
import com.algorceries.backend.model.DishListDish;
import com.algorceries.backend.security.UserPrincipal;
import com.algorceries.backend.service.DishListDishService;
import com.algorceries.backend.service.exception.EmptyOptionalException;
import com.algorceries.backend.service.exception.WrongHouseholdException;

/**
 * {@link RestController} for {@link DishListDish dish list dishes}.
 */
@RestController
@RequestMapping("/dishListDishes")
public class DishListDishController {

    private final DishListDishService dishListDishService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishListDishController(DishListDishService dishListDishService) {
        this.dishListDishService = dishListDishService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @PutMapping
    @RequestMapping("/{id}")
    public DishListDish update(@PathVariable UUID id,
                               @RequestBody DishListDishAmountDTO amountDto,
                               UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

        try {
            return dishListDishService.changeAmount(id, amountDto.getAmount(), userPrincipal.getHouseholdId());
        } catch (EmptyOptionalException | WrongHouseholdException e) {
            // also throw NotFoundException if the user does not belong to the household
            // to prevent leaking information
            throw new NotFoundException();
        } catch (IllegalArgumentException e) {
            throw new BadRequestException();
        }
    }
}
