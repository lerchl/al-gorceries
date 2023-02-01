import { React, useEffect, useState } from "react";
import { DISH_INGREDIENTS, getEntitiesWithParam } from "../../ApiUtils";
import { ShoppingListItem } from "./ShoppingListItem";

export const ShoppingList = ({dishes}) => {

    const [dishIngridients, setDishIngridients] = useState([]);

    useEffect(() => {
        dishes.forEach(dish => {
            getEntitiesWithParam(DISH_INGREDIENTS, dis => setDishIngridients(old => [...old, ...dis]), dish.id);
        });
    }, []);

    function groupByIngridients() {
        let ingridients = [];
        dishIngridients.forEach(di => {
            if (ingridients.some(i => i.ingridient.id === di.ingridient.id)) {
                let ingridient = ingridients.find(i => i.ingridient.id === di.ingridient.id)
                if (ingridient.measurements.some(m => m.measurement.id === di.measurement.id)) {
                    let measurement = ingridient.measurements.find(m => m.measurement.id === di.measurement.id);
                    measurement.factor += di.factor
                } else {
                    ingridient.measurements.push({
                        measurement: di.measurement,
                        factor: di.factor
                    });
                }
            } else {
                ingridients.push({
                    ingridient: di.ingridient,
                    measurements: [
                        {
                            measurement: di.measurement,
                            factor: di.factor
                        }
                    ]
                })
            }
        });
        return ingridients;
    }

    return (
        <>
            {
                groupByIngridients().map(i => <ShoppingListItem key={i.ingridient.id} item={i} />)
            }
        </>
    );

}