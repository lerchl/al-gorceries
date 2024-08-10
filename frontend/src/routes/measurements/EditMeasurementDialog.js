import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { React, useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { createEntityAndGetEntities } from "../../ApiUtils";
import { EditDialogContext } from "../../Entity";
import { TableContentContext } from "../../OverviewPage";
import { EntityContext } from "../../TableContent";

export const EditMeasurementDialog = () => {
	
	const { t } = useTranslation();

	const { entityApiEndpoint, setEntities } = useContext(TableContentContext);
	const entity = useContext(EntityContext);
	const { show, close } = useContext(EditDialogContext);

    const [name, setName] = useState(entity.name);
	const [countable, setCountable] = useState(entity.countable);

    const closeDialog = () => {
        setName(entity.name);
		setCountable(entity.countable);
        close();
    }

    const saveEntity = () => {
		entity.name = name;
		entity.countable = countable;
        createEntityAndGetEntities(entityApiEndpoint, entity, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show}
               onHide={closeDialog}
               backdrop="static"
               keyboard={false}>
            <Modal.Header closeButton>
                <ModalTitle>{ t("measurement.dialog.edit.title") }</ModalTitle>
            </Modal.Header>
            <ModalBody>
                <div className="row dialog-row">
                    <TextField value={name} label={ t("measurement.attribute.name") } onChange={ event => setName(event.target.value) } />
                </div>
				<div className="row dialog-row">
					<FormControlLabel label={ t("measurement.attribute.countable") } control={ <Checkbox checked={countable} onChange={ event => setCountable(event.target.checked) } />} /> 
				</div>
            </ModalBody>
            <ModalFooter>
                <button onClick={saveEntity} className="custom-button primary">{ t("base.action.save") }</button>
                <button onClick={closeDialog} className="custom-button">{ t("base.action.close") }</button>
            </ModalFooter>
        </Modal>
    );
}
