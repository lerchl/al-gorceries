package com.algorceries.backend.controller;

import java.util.UUID;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.dto.DishListDishSelectionDTO;
import com.algorceries.backend.model.DishListDish;
import com.algorceries.backend.repository.DishListDishRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * {@link RestController} for {@link DishListDish dish list dishes}.
 */
@RestController
@RequestMapping("/dishListDishes")
public class DishListDishController {

    private final DishListDishRepository dishListDishRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishListDishController(DishListDishRepository dishListDishRepository) {
        this.dishListDishRepository = dishListDishRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @PutMapping
    @RequestMapping("/{id}")
    public DishListDish update(@PathVariable UUID id, @RequestBody DishListDishSelectionDTO selectionDto) {
        var optionalDishListDish = dishListDishRepository.findById(id);

        if (optionalDishListDish.isEmpty()) {
            throw new BadRequestException("id");
        }

        var dishListDish = optionalDishListDish.get();
        dishListDish.setSelected(selectionDto.isSelected());
        return dishListDishRepository.save(dishListDish);

        // TODO: Move to logic and check whether DishListDish with that id even exists
        // dishListDishRepository.updateSelectedById(selected, id);
        // return dishListDishRepository.findById(id).get();
    }
}
