package com.algorceries.backend.controller;

import java.util.List;
import java.util.UUID;

import com.algorceries.backend.dto.DishIngredientDTO;
import com.algorceries.backend.model.DishIngredient;
import com.algorceries.backend.repository.DishIngredientRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dishIngredients")
public class DishIngredientController {

    private final DishIngredientRepository dishIngredientRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishIngredientController(DishIngredientRepository dishIngredientRepository) {
        this.dishIngredientRepository = dishIngredientRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping("/{dishId}")
    public List<DishIngredient> findByDishId(@PathVariable UUID dishId) {
        return dishIngredientRepository.findByDishId(dishId);
    }

    @PostMapping
    public DishIngredient save(DishIngredientDTO dishIngredientDTO) {
        return dishIngredientRepository.save(fromDTO(dishIngredientDTO),
                                             dishIngredientDTO.getDishId(),
                                             dishIngredientDTO.getIngredientId(),
                                             dishIngredientDTO.getUnitOfMeasurementId());
    }

    // /////////////////////////////////////////////////////////////////////////
    // Util
    // /////////////////////////////////////////////////////////////////////////

    private static DishIngredient fromDTO(DishIngredientDTO dishIngredientDTO) {
        return new DishIngredient(dishIngredientDTO.getId(), dishIngredientDTO.getAmount());
    }
}
