import { TextField } from "@mui/material";
import { React, useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { updateEntityAndGetEntities } from "../../ApiUtils";
import { EditDialogContext } from "../../Entity";
import { TableContentContext } from "../../OverviewPage";
import { EntityContext } from "../../TableContent";

export const EditIngredientDialog = () => {
    const {entityApiEndpoint, setEntities} = useContext(TableContentContext);
    const entity = useContext(EntityContext);
    const {show, close} = useContext(EditDialogContext);

    const [name, setName] = useState(entity.name);

    const onChangeName = event => {
        setName(event.target.value);
    }

    const closeDialog  = () => {
        setName(entity.name)
        close();
    }

    const saveEntity = () => {
        entity.name = name;
        updateEntityAndGetEntities(entityApiEndpoint, entity, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show}
               onHide={closeDialog}
               backdrop="static"
               keyboard={false}>
            <ModalHeader closeButton>
                <Modal.Title>Zutat bearbeiten</Modal.Title>
            </ModalHeader>
            <ModalBody>
                <div className="row dialog-row">
                    <TextField value={name} label="Name" onChange={onChangeName} />
                </div>
            </ModalBody>
            <ModalFooter>
                <button onClick={saveEntity} className="custom-button primary">Speichern</button>
                <button onClick={closeDialog} className="custom-button">Schließen</button>
            </ModalFooter>
        </Modal>
    );
}
