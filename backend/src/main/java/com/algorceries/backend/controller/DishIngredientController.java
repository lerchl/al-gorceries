package com.algorceries.backend.controller;

import java.util.List;
import java.util.UUID;

import com.algorceries.backend.dto.DishIngredientDTO;
import com.algorceries.backend.model.DishIngredient;
import com.algorceries.backend.service.DishIngredientService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dishIngredients")
public class DishIngredientController {

    private final DishIngredientService dishIngredientService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishIngredientController(DishIngredientService dishIngredientService) {
        this.dishIngredientService = dishIngredientService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping("/{dishId}")
    public List<DishIngredient> findByDishId(@PathVariable UUID dishId) {
        return dishIngredientService.findByDishId(dishId);
    }

    @PostMapping
    public DishIngredient save(@RequestBody @Valid DishIngredientDTO dishIngredientDTO) {
        return dishIngredientService.save(fromDTO(dishIngredientDTO),
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
