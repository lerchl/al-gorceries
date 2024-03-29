package com.algorceries.backend.dto;

import java.util.UUID;

import com.algorceries.backend.model.DishIngredient;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * DTO for a {@link DishIngredient dish ingredient}.
 */
public class DishIngredientDTO {

    private UUID id;

	@NotNull
    private UUID dishId;

	@NotNull
    private UUID ingredientId;

	@NotNull
    private UUID unitOfMeasurementId;

	@Positive
    private double amount;

    // /////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    // /////////////////////////////////////////////////////////////////////////

    public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public UUID getDishId() {
		return dishId;
	}

	public void setDishId(UUID dishId) {
		this.dishId = dishId;
	}

	public UUID getIngredientId() {
		return ingredientId;
	}

	public void setIngredientId(UUID ingredientId) {
		this.ingredientId = ingredientId;
	}

	public UUID getUnitOfMeasurementId() {
		return unitOfMeasurementId;
	}

	public void setUnitOfMeasurementId(UUID unitOfMeasurementId) {
		this.unitOfMeasurementId = unitOfMeasurementId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}
}
