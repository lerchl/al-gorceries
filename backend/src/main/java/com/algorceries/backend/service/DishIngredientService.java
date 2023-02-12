package com.algorceries.backend.service;

import java.util.List;
import java.util.UUID;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.model.Dish;
import com.algorceries.backend.model.DishIngredient;
import com.algorceries.backend.model.Ingredient;
import com.algorceries.backend.model.UnitOfMeasurement;
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

    /**
     * Finds all {@link DishIngredient dish ingredients} of a {@link Dish dish}.
     * @param dishId the id of the {@link Dish dish}
     * @return all found {@link DishIngredient dish ingredients}
     */
    public List<DishIngredient> findByDishId(UUID dishId) {
        return dishIngredientRepository.findByDishId(dishId);
    }

    /**
     * Saves a {@link DishIngredient dish ingredient}.
     * @param dishIngredient the {@link DishIngredient dish ingredient} to save
     * @return the saved {@link DishIngredient dish ingredient}
     */
    public DishIngredient save(DishIngredient dishIngredient) {
        return dishIngredientRepository.save(dishIngredient);
    }

    /**
     * Saves a {@link DishIngredient dish ingredient} after setting its
     * {@link Dish dish}, {@link Ingredient ingredient} and {@link UnitOfMeasurement unit of measurement}.
     *
     * @param dishIngredient the {@link DishIngredient dish ingredient} to save
     * @param dishId the id of the {@link Dish dish}
     * @param ingredientId the id of the {@link Ingredient ingredient}
     * @param unitOfMeasurementId the id of the {@link UnitOfMeasurement unit of measurement}
     * @return the saved {@link DishIngredient dish ingredient}
     */
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

    /**
     * Deletes a {@link DishIngredient dish ingredient}.
     * @param dishIngredientId the id of the {@link DishIngredient dish ingredient}
     */
    public void delete(UUID dishIngredientId) {
        dishIngredientRepository.deleteById(dishIngredientId);
    }
}
