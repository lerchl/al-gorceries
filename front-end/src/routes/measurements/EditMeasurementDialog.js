import { TextField } from "@mui/material";
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

    const close = () => {
        setName(measurement.name);
        closeDialog();
    }

    return (
        <Modal show={show}
               onHide={close}
               backdrop="static"
               keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Maßeinheit bearbeiten</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row dialog-row">
                    <TextField value={name} label="Bezeichnung" onChange={e => setName(e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={saveMeasurement} className="custom-button primary">Speichern</button>
                <button type="button" onClick={close} className="custom-button">Schließen</button>
            </Modal.Footer>
        </Modal>
    );
}