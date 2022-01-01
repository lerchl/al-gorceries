import axios from "axios";
import { useState } from "react";
import { Modal } from "react-bootstrap";

export const EditMeasurementDialog = ({show, closeDialog, getMeasurements, setMeasurements, measurement}) => {
    const [name, setName] = useState(measurement.name);

    const saveMeasurement = () => {
        let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/measurements/${measurement._id}`;
        axios.put(url, {"name": name}).then(res => {
            if (res.status !== 200) {
                console.log(res);
            }
            getMeasurements(setMeasurements);
        });
        closeDialog();
    }

    const onChangeName = event => {
        setName(event.target.value);
    }

    return (
        <Modal show={show}
               onHide={closeDialog}
               backdrop="static"
               keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Maßeinheit bearbeiten</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input value={name} onChange={onChangeName} placeholder="Bezeichnung" />
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={saveMeasurement} className="custom-button primary">Speichern</button>
                <button type="button" onClick={closeDialog} className="custom-button">Schließen</button>
            </Modal.Footer>
        </Modal>
    );
}