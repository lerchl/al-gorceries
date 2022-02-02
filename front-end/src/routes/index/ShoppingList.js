import { useEffect, useState } from "react";
import { DISH_INGRIDIENTS, getEntitiesWithParam } from "../../ApiUtils";
import { ShoppingListItem } from "./ShoppingListItem";

export const ShoppingList = ({dishes}) => {

    const [dishIngridients, setDishIngridients] = useState([]);

    useEffect(() => {
        dishes.forEach(dish => {
            getEntitiesWithParam(DISH_INGRIDIENTS, dis => setDishIngridients(old => [...old, ...dis]), dish._id);
        });
    }, []);

    function groupByIngridients() {
        let ingridients = [];
        dishIngridients.forEach(di => {
            if (ingridients.some(i => i.ingridient._id === di.ingridient._id)) {
                let ingridient = ingridients.find(i => i.ingridient._id === di.ingridient._id)
                if (ingridient.measurements.some(m => m.measurement._id === di.measurement._id)) {
                    let measurement = ingridient.measurements.find(m => m.measurement._id === di.measurement._id);
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
                groupByIngridients().map(i => <ShoppingListItem key={i.ingridient._id} item={i} />)
            }
        </>
    );

}