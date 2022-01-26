import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { createEntityAndGetEntitiesWithParam, DISH_INGRIDIENTS } from "../../ApiUtils";

export const AddDishIngridientDialog = ({show, close, dishId, setDishIngridients, measurements, ingridients}) => {

    const [factor, setFactor] = useState("");
    const [measurementId, setMeasurementId] = useState("");
    const [ingridientId, setIngridientId] = useState("");

    const closeDialog = () => {
        setFactor("");
        setMeasurementId("");
        setIngridientId("");
        close();
    }

    const addDishIngridient = () => {
        const dishIngridient = {
            "factor": factor,
            "measurement": measurementId,
            "ingridient": ingridientId,
            "dish": dishId
        }
        createEntityAndGetEntitiesWithParam(DISH_INGRIDIENTS, dishIngridient, setDishIngridients, dishId);
        closeDialog();
    }

    return (
        <Modal show={show} backdrop="static" onHide={closeDialog} keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Zutat hinzufügen</Modal.Title>
            </Modal.Header>
            <ModalBody>
                <div className="row dialog-row">
                    <TextField label="Faktor" value={factor} onChange={e => setFactor(e.target.value)} type="number" className="number-input" inputProps={{ inputMode: "numeric" }} autoComplete="off" />
                </div>
                <div className="row dialog-row">
                    <TextField label="Maßeinheit" value={measurementId} onChange={e => setMeasurementId(e.target.value)} select>
                        {
                            measurements.map(m => {
                                return <MenuItem key={m._id} value={m._id}>{m.name}</MenuItem>
                            })
                        }
                    </TextField>
                </div>
                <div className="row dialog-row">
                    <TextField label="Zutat" value={ingridientId} onChange={e => setIngridientId(e.target.value)} select>
                        {
                            ingridients.map(i => {
                                return <MenuItem key={i._id} value={i._id}>{i.name}</MenuItem>
                            })
                        }
                    </TextField>
                </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" onClick={addDishIngridient} className="custom-button primary">Hinzufügen</button>
                <button type="button" onClick={closeDialog} className="custom-button">Schließen</button>
            </ModalFooter>
        </Modal>
    );

}