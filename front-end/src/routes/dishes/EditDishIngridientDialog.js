import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { DISH_INGRIDIENTS, updateEntityAndGetEntitiesWithParam } from "../../ApiUtils";

export const EditDishIngridientDialog = ({show, close, dishId, setDishIngridients, dishIngridient, measurements, ingridients}) => {

    const [factor, setFactor] = useState(dishIngridient.factor);
    const [measurementId, setMeasurementId] = useState(dishIngridient.measurement._id);
    const [ingridientId, setIngridientId] = useState(dishIngridient.ingridient._id);

    const saveDishIngridient = () => {
        dishIngridient.factor = factor;
        dishIngridient.measurement = measurementId;
        dishIngridient.ingridient = ingridientId;
        updateEntityAndGetEntitiesWithParam(DISH_INGRIDIENTS, dishIngridient, setDishIngridients, dishId);
        close();
    }

    return (
        <Modal show={show} backdrop="static" onHide={close} keyboard={false}>
            <Modal.Header closeButton>
                <ModalTitle>Zutat bearbeiten</ModalTitle>
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
                <button type="button" onClick={saveDishIngridient} className="custom-button primary">Speichern</button>
                <button type="button" onClick={close} className="custom-button">Schließen</button>
            </ModalFooter>
        </Modal>
    );
}