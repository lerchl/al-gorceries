import { TextField } from "@mui/material";
import { React, useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { createEntityAndGetEntities } from "../../ApiUtils";
import { AddEntityDialogContext } from "../../TableHead";

export const AddIngredientDialog = () => {
    const {show, close, setEntities, entityApiEndpoint} = useContext(AddEntityDialogContext);

    const [name, setName] = useState("");

    const onChangeName = event => {
        setName(event.target.value);
    }

    const closeDialog = () => {
        setName("");
        close();
    }

    const saveEntity = () => {
        createEntityAndGetEntities(entityApiEndpoint, { "name": name }, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show}
               onHide={closeDialog}
               backdrop="static"
               keyboard={false}>
            <Modal.Header closeButton>
                <ModalTitle>Zutat erstellen</ModalTitle>
            </Modal.Header>
            <ModalBody>
                <div className="row dialog-row">
                    <TextField value={name} label="Name" onChange={onChangeName} />
                </div>
            </ModalBody>
            <ModalFooter>
                <button onClick={saveEntity} className="custom-button primary">Hinzufügen</button>
                <button onClick={closeDialog} className="custom-button">Schließen</button>
            </ModalFooter>
        </Modal>
    );
}