import { React, Fragment } from "react";
import { Container } from "react-bootstrap";

export const ShoppingListItem = ({ item }) => {

    return (
        <>
            <h2>{item.ingredient.name}</h2>
            <Container fluid className="overlay">
                <p className="mb-0">
                    {
                        item.unitsOfMeasurement.map(m => (
                            <Fragment key={m.unitOfMeasurement.id}>
                                {item.unitsOfMeasurement.indexOf(m) > 0 && ", "} {m.unitOfMeasurement.countable && m.amount} {m.unitOfMeasurement.name}
                            </Fragment>
                        ))
                    }
                </p>
            </Container>
        </>
    );
}
