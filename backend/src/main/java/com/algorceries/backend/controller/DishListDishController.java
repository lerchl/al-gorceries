package com.algorceries.backend.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.dto.DishListDishAmountDTO;
import com.algorceries.backend.model.DishListDish;
import com.algorceries.backend.service.DishListDishService;

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
    public DishListDish update(@PathVariable UUID id, @RequestBody DishListDishAmountDTO amountDto) {
        try {
            return dishListDishService.changeAmount(id, amountDto.getAmount());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(e.getMessage());
        }
    }
}
