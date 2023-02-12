package com.algorceries.backend.controller;

import java.util.List;
import java.util.UUID;

import com.algorceries.backend.dto.DishIngredientDTO;
import com.algorceries.backend.model.DishIngredient;
import com.algorceries.backend.service.DishIngredientService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.NO_CONTENT;

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

    @RequestMapping(method = { RequestMethod.POST, RequestMethod.PUT })
    public DishIngredient save(@RequestBody @Valid DishIngredientDTO dishIngredientDTO) {
        return dishIngredientService.save(fromDTO(dishIngredientDTO),
                                          dishIngredientDTO.getDishId(),
                                          dishIngredientDTO.getIngredientId(),
                                          dishIngredientDTO.getUnitOfMeasurementId());
    }

    @DeleteMapping("/{dishIngredientId}")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable UUID dishIngredientId) {
        dishIngredientService.delete(dishIngredientId);
    }

    // /////////////////////////////////////////////////////////////////////////
    // Util
    // /////////////////////////////////////////////////////////////////////////

    private static DishIngredient fromDTO(DishIngredientDTO dishIngredientDTO) {
        return new DishIngredient(dishIngredientDTO.getId(), dishIngredientDTO.getAmount());
    }
}
