import axios from "axios";
import { useState } from "react";
import { Modal } from "react-bootstrap";

function MeasurementDialog({showDialog, handleClose, getMeasurements, setMeasurements}) {
    const [name, setName] = useState("");

    const onChangeName = event => {
        setName(event.target.value);
    }

    const createMeasurement = () => {
        let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/measurements`;
        axios.post(url, {"name": name}).then(res => {
            if (res.status !== 201) {
                console.log(res);
            }
            getMeasurements(setMeasurements);
        });
        close();
    }

    const close = () => {
        setName("");
        handleClose();
    }

    return (
        <Modal show={showDialog}
               onHide={handleClose}
               backdrop="static"
               keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Maßeinheit erstellen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input value={name} onChange={onChangeName} placeholder="Bezeichnung" />
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={createMeasurement} className="custom-button primary">Hinzufügen</button>
                <button type="button" onClick={close} className="custom-button">Schließen</button>
            </Modal.Footer>
        </Modal>
    );
}

export default MeasurementDialog;