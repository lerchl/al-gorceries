import { useContext, useState } from "react";
import { useTranslation } from "react-i18next"
import { AddEntityDialogContext } from "../../TableHead";
import { createEntityAndGetEntities } from "../../ApiUtils";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { Autocomplete, TextField } from "@mui/material";

export const DishGroupDialog = ({ dishOptions }) => {

	const { t } = useTranslation();

	const { show, close, setEntities, entityApiEndpoint } = useContext(AddEntityDialogContext);

	const [name, setName] = useState("");
	const [dishes, setDishes] = useState([]);

	const onChangeName = event => setName(event.target.value);

	const closeDialog = () => {
		setName("");
		setDishes([]);
		close();
	}

	const saveEntity = () => {
		createEntityAndGetEntities(entityApiEndpoint, { "name": name, "dishes": dishes }, setEntities);
		closeDialog();
	}

	return (
		<Modal show={show} onHide={closeDialog} backdrop="static" keyboard={false}>
			<Modal.Header closeButton>
				<ModalTitle>{ t("dishGroup.dialog.add.title") }</ModalTitle>	
			</Modal.Header>
			<ModalBody>
				<div className="row dialog-row">
                    <TextField value={name} label={ t("dishGroup.attribute.name") } onChange={onChangeName} />
				</div>
				<div className="row dialog-row">
                    <Autocomplete options={dishOptions}
                                  getOptionLabel={s => s.name}
                                  onChange={(_event, value) => setDishes(value)}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("dishGroup.attribute.dishes")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("dish.noOptions")}
                                  clearIcon={<></>}
                                  multiple />
				</div>
			</ModalBody>
			<ModalFooter>
                <button onClick={saveEntity} className="custom-button primary">{ t("base.action.add") }</button>
                <button onClick={closeDialog} className="custom-button">{ t("base.action.close") }</button>
			</ModalFooter>
		</Modal>
	);
}
