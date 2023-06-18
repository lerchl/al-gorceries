package com.algorceries.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.model.Dish;
import com.algorceries.backend.service.DishService;

/**
 * {@link RestController} for {@link Dish Dishes}.
 */
@RestController
@RequestMapping(DishController.REQUEST_MAPPING)
public class DishController extends HouseholdScopedController<Dish> {

    private static final String REQUEST_MAPPING = "/dishes";

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishController(DishService service) {
        super(service, REQUEST_MAPPING);
    }
}
