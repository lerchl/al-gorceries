package com.algorceries.backend.service;

import java.util.List;
import java.util.UUID;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.model.DishIngredient;
import com.algorceries.backend.repository.DishIngredientRepository;
import com.algorceries.backend.repository.DishRepository;
import com.algorceries.backend.repository.IngredientRepository;
import com.algorceries.backend.repository.UnitOfMeasurementRepository;
import org.springframework.stereotype.Service;

/**
 * {@link Service} for {@link DishIngredient dish ingredients}.
 */
@Service
public class DishIngredientService {

    private final DishIngredientRepository dishIngredientRepository;
    private final DishRepository dishRepository;
    private final IngredientRepository ingredientRepository;
    private final UnitOfMeasurementRepository unitOfMeasurementRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishIngredientService(DishIngredientRepository dishIngredientRepository,
                                 DishRepository dishRepository,
                                 IngredientRepository ingredientRepository,
                                 UnitOfMeasurementRepository unitOfMeasurementRepository) {
        this.dishIngredientRepository = dishIngredientRepository;
        this.dishRepository = dishRepository;
        this.ingredientRepository = ingredientRepository;
        this.unitOfMeasurementRepository = unitOfMeasurementRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public List<DishIngredient> findByDishId(UUID dishId) {
        return dishIngredientRepository.findByDishId(dishId);
    }

    public DishIngredient save(DishIngredient dishIngredient) {
        return dishIngredientRepository.save(dishIngredient);
    }

    public DishIngredient save(DishIngredient dishIngredient,
                               UUID dishId,
                               UUID ingredientId,
                               UUID unitOfMeasurementId) {
        var dish = dishRepository.findById(dishId);
        var ingredient = ingredientRepository.findById(ingredientId);
        var unitOfMeasurement = unitOfMeasurementRepository.findById(unitOfMeasurementId);

        if (dish.isEmpty()) {
            throw new BadRequestException("dish");
        } else if (ingredient.isEmpty()) {
            throw new BadRequestException("ingredient");
        } else if (unitOfMeasurement.isEmpty()) {
            throw new BadRequestException("unitOfMeasurement");
        }

        dishIngredient.setDish(dish.get());
        dishIngredient.setIngredient(ingredient.get());
        dishIngredient.setUnitOfMeasurement(unitOfMeasurement.get());

        return save(dishIngredient);
    }
}
