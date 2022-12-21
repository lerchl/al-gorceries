import { React, Fragment } from "react";
import { Container } from "react-bootstrap";

export const ShoppingListItem = ({item}) => {

    return (
        <>
            <h2>{item.ingridient.name}</h2>
            <Container fluid className="overlay">
                <p className="mb-0">
                    {
                        item.measurements.map(m => {
                            return (
                                <Fragment key={m.measurement._id}>
                                    {item.measurements.indexOf(m) > 0 ? ", " + m.factor : m.factor} {m.measurement.name}
                                </Fragment>
                            );
                        })
                    }
                </p>
            </Container>
        </>
    );
}
