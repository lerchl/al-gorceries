import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { React, useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useTranslation } from "react-i18next";
import { updateEntityAndGetEntities } from "../../ApiUtils";
import { EditDialogContext } from "../../Entity";
import { TableContentContext } from "../../OverviewPage";
import { EntityContext } from "../../TableContent";

export const EditIngredientDialog = () => {

	const { t } = useTranslation();

    const { entityApiEndpoint, setEntities } = useContext(TableContentContext);
    const entity = useContext(EntityContext);
    const { show, close } = useContext(EditDialogContext);

    const [name, setName] = useState(entity.name);
	const [pantryStaple, setPantryStaple] = useState(entity.pantryStaple);

    const onChangeName = event => setName(event.target.value);
	const onChangePantryStaple = event => setPantryStaple(event.target.checked);

    const closeDialog  = () => {
        setName(entity.name)
		setPantryStaple(entity.pantryStaple);
        close();
    }

    const saveEntity = () => {
        entity.name = name;
		entity.pantryStaple = pantryStaple;
        updateEntityAndGetEntities(entityApiEndpoint, entity, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show}
               onHide={closeDialog}
               backdrop="static"
               keyboard={false}>
            <ModalHeader closeButton>
                <Modal.Title>{ t("ingredient.dialog.edit.title") }</Modal.Title>
            </ModalHeader>
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
                <button onClick={saveEntity} className="custom-button primary">{ t("base.action.save") }</button>
                <button onClick={closeDialog} className="custom-button">{ t("base.action.close") }</button>
            </ModalFooter>
        </Modal>
    );
}
