import { DishListDish } from "./DishListDish";

export const DishesOfDishList = ({ dishList, setDishList }) => {

    return (
        <>
            {
                dishList.dishes.map(dish => <DishListDish key={dish._id}
                        dishList={dishList} setDishList={setDishList} dish={dish}
                        selected={dishList.selectedDishes.some(d => d._id === dish._id)} />)
            }
        </>
    );
}