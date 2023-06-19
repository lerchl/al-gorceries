package com.algorceries.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.model.Ingredient;
import com.algorceries.backend.service.IngredientService;

/**
 * {@link RestController} for {@link Ingredient ingredients}.
 */
@RestController
@RequestMapping(IngredientController.REQUEST_MAPPING)
public class IngredientController extends HouseholdScopedController<Ingredient> {

    protected static final String REQUEST_MAPPING = "/ingredients";

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public IngredientController(IngredientService ingredientService) {
        super(ingredientService, REQUEST_MAPPING);
    }
}
