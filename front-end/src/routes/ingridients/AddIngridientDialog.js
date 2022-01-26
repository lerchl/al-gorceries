import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { createEntityAndGetEntities } from "../../ApiUtils";
import { DialogContext } from "../../TableHead";

export const AddIngridientDialog = () => {
    const {show, close, setEntities, entityApiEndpoint, dialogTitle} = useContext(DialogContext);

    const [name, setName] = useState("");

    const onChangeName = event => {
        setName(event.target.value);
    }

    const closeDialog = () => {
        setName("");
        close();
    }

    const saveEntity = () => {
        createEntityAndGetEntities(entityApiEndpoint, {"name": name}, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show}
               backdrop="static"
               onHide={closeDialog}
               keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input value={name} onChange={onChangeName} placeholder="Name" />
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={saveEntity} className="custom-button primary">Hinzufügen</button>
                <button type="button" onClick={closeDialog} className="custom-button">Schließen</button>
            </Modal.Footer>
        </Modal>
    );
}