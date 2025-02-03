import { Autocomplete, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { updateEntityAndGetEntities } from "../../ApiUtils";
import { compareEntities, EditDialogContext } from "../../Entity";
import { TableContentContext } from "../../OverviewPage";
import { EntityContext } from "../../TableContent";

export const EditDishGroupDialog = ({ dishOptions }) => {

	const { t } = useTranslation();

	const { entityApiEndpoint, setEntities } = useContext(TableContentContext);
	const entity = useContext(EntityContext);
	const { show, close } = useContext(EditDialogContext);

	const [name, setName] = useState(entity.name);
	const [dishes, setDishes] = useState(entity.dishes);

	const onChangeName = event => setName(event.target.value);
	const onChangeDishes = (_event, value) => setDishes(value);

	const closeDialog = () => {
		setName(entity.name);
		setDishes(entity.dishes);
		close();
	}

	const saveEntity = () => {
		entity.name = name;
		entity.dishes = dishes;
		updateEntityAndGetEntities(entityApiEndpoint, entity, setEntities);
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
                    <Autocomplete value={dishes}
								  isOptionEqualToValue={compareEntities}
								  options={dishOptions}
                                  getOptionLabel={s => s.name}
                                  onChange={onChangeDishes}
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
                <button onClick={saveEntity} className="custom-button primary">{ t("base.action.save") }</button>
                <button onClick={closeDialog} className="custom-button">{ t("base.action.close") }</button>
			</ModalFooter>
		</Modal>
	);
}
