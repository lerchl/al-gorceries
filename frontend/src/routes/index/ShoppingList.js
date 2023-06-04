import { React } from "react";
import { ShoppingListItem } from "./ShoppingListItem";

export const ShoppingList = ({ dishListDishes }) => {

    function groupByIngredients() {
        let ingredients = [];

        dishListDishes.flatMap(dld => dld.dish.dishIngredients).forEach(di => {
            // find ingredient with same id in ingredients
            let ingredient = ingredients.find(i => i.ingredient.id === di.ingredient.id);

            if (ingredient) {
                // ingredient already exists
                // find unitOfMeasurement with same id in the ingredients units of measurement
                let unitOfMeasurement = ingredient.unitsOfMeasurement.find(m => m.unitOfMeasurement.id === di.unitOfMeasurement.id);

                if (unitOfMeasurement) {
                    // unitOfMeasurement already exists, add amount
                    unitOfMeasurement.amount += di.amount;
                } else {
                    // unitOfMeasurement does not exist, add it and it's amount
                    ingredient.unitsOfMeasurement.push({
                        unitOfMeasurement: di.unitOfMeasurement,
                        amount: di.amount
                    });
                }
            } else {
                // ingredient does not exist, add it and it's unitOfMeasurement and amount
                ingredients.push({
                    ingredient: di.ingredient,
                    unitsOfMeasurement: [{
                        unitOfMeasurement: di.unitOfMeasurement,
                        amount: di.amount
                    }]
                });
            }
        });

        return ingredients;
    }

    return (
        <>
            {
                groupByIngredients().map(i => <ShoppingListItem key={i.ingredient.id} item={i} />)
            }
        </>
    );
}
