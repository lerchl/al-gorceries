import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { React, useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { createEntityAndGetEntities } from "../../ApiUtils";
import { AddEntityDialogContext } from "../../TableHead";

export const AddMeasurementDialog = () => {
	
	const { t } = useTranslation();

    const { show, close, setEntities, entityApiEndpoint } = useContext(AddEntityDialogContext);

    const [name, setName] = useState("");
	const [countable, setCountable] = useState(true);

    const closeDialog = () => {
        setName("");
        close();
    }

    const saveEntity = () => {
        createEntityAndGetEntities(entityApiEndpoint, { "name": name, "countable": countable }, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show}
               onHide={closeDialog}
               backdrop="static"
               keyboard={false}>
            <Modal.Header closeButton>
                <ModalTitle>Maßeinheit erstellen</ModalTitle>
            </Modal.Header>
            <ModalBody>
                <div className="row dialog-row">
                    <TextField value={name} label={ t("measurement.attribute.name") } onChange={ event => setName(event.target.value) } />
                </div>
				<div className="row dialog-row">
					<FormControlLabel label={ t("measurement.attribute.countable") }
									  control={ <Checkbox checked={countable} onChange={ event => setCountable(event.target.checked) } />} /> 
				</div>
            </ModalBody>
            <ModalFooter>
                <button onClick={saveEntity} className="custom-button primary">{ t("base.action.add") }</button>
                <button onClick={closeDialog} className="custom-button">{ t("base.action.close") }</button>
            </ModalFooter>
        </Modal>
    );
}