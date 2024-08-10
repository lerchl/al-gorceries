import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { React, useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { createEntityAndGetEntities } from "../../ApiUtils";
import { AddEntityDialogContext } from "../../TableHead";

export const AddIngredientDialog = () => {
	
	const { t } = useTranslation();

    const { show, close, setEntities, entityApiEndpoint } = useContext(AddEntityDialogContext);

    const [name, setName] = useState("");
	const [pantryStaple, setPantryStaple] = useState(false);

    const onChangeName = event => setName(event.target.value);
	const onChangePantryStaple = event => setPantryStaple(event.target.checked);

    const closeDialog = () => {
        setName("");
		setPantryStaple(false);
        close();
    }

    const saveEntity = () => {
        createEntityAndGetEntities(entityApiEndpoint, { "name": name, "pantryStaple": pantryStaple }, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show}
               onHide={closeDialog}
               backdrop="static"
               keyboard={false}>
            <Modal.Header closeButton>
                <ModalTitle>{ t("ingredient.dialog.add.title") }</ModalTitle>
            </Modal.Header>
            <ModalBody>
                <div className="row dialog-row">
                    <TextField value={name} label={ t("ingredient.attribute.name") } onChange={onChangeName} />
                </div>
				<div className="row dialog-row">
					<FormControlLabel label={ t("ingredient.attribute.pantryStaple") }
									  control={ <Checkbox checked={pantryStaple} onChange={onChangePantryStaple} />} /> 
				</div>
            </ModalBody>
            <ModalFooter>
                <button onClick={saveEntity} className="custom-button primary">{ t("base.action.add") }</button>
                <button onClick={closeDialog} className="custom-button">{ t("base.action.close") }</button>
            </ModalFooter>
        </Modal>
    );
}