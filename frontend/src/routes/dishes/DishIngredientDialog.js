import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { createEntityAndGetEntitiesWithParam, DISH_INGREDIENTS } from "../../ApiUtils";
import { compareEntities } from "../../Entity";

export const DishIngredientDialog = ({show, close, dishId, setDishIngredients, dishIngredient, measurements, ingredients}) => {

    const { t } = useTranslation();

    const [amount, setFactor] = useState(dishIngredient?.amount || "");
    const [unitOfMeasurement, setMeasurement] = useState(dishIngredient?.unitOfMeasurement || null);
    const [ingredient, setIngredient] = useState(dishIngredient?.ingredient || null);

    const title = dishIngredient ? t("dish.ingredients.dialog.edit.title") : t("dish.ingredients.dialog.add.title");

	const updateUnitOfMeasurement = unitOfMeasurement => {
		setMeasurement(unitOfMeasurement);

		if (!unitOfMeasurement.countable) {
			setFactor("");			
		}
	}

    const closeDialog = () => {
        if (!dishIngredient) {
            setFactor("");
            setMeasurement(null);
            setIngredient(null);
        } else {
			setFactor(dishIngredient.amount);
			setMeasurement(dishIngredient.unitOfMeasurement);
			setIngredient(dishIngredient.ingredient);
		}

        close();
    }

    const addDishIngredient = () => {
        let data = {
            "id": dishIngredient?.id,
            "dishId": dishId,
            "ingredientId": ingredient.id,
            "unitOfMeasurementId": unitOfMeasurement.id
        }
		
		if (unitOfMeasurement?.countable) {
			data["amount"] = amount;
		}

        createEntityAndGetEntitiesWithParam(DISH_INGREDIENTS, data, setDishIngredients, dishId);
        closeDialog();
    }

    return (
        <Modal show={show} backdrop="static" onHide={closeDialog} keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <ModalBody>
				<div className="row dialog-row">
					<TextField label="Faktor"
							   value={amount}
							   onChange={e => setFactor(e.target.value)}
							   type="number"
							   className="number-input"
							   inputProps={{ inputMode: "numeric" }}
							   autoComplete="off"
							   disabled={ !unitOfMeasurement?.countable } />
				</div>
                <div className="row dialog-row">
                    <Autocomplete options={measurements}
                                  getOptionLabel={m => m?.name}
                                  value={unitOfMeasurement}
                                  isOptionEqualToValue={compareEntities}
                                  onChange={(_event, value) => updateUnitOfMeasurement(value) }
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("measurement.name")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("measurement.noOptions")}
                                  clearIcon={<></>} />
                </div>
                <div className="row dialog-row">
                    <Autocomplete options={ingredients}
                                  getOptionLabel={i => i.name}
                                  value={ingredient}
                                  isOptionEqualToValue={compareEntities}
                                  onChange={(_event, value) => setIngredient(value)}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("ingredient.name")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("ingredient.noOptions")}
                                  clearIcon={<></>} />
                </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" onClick={addDishIngredient} className="custom-button primary">{dishIngredient ? t("base.action.save") : t("base.action.add")}</button>
                <button type="button" onClick={closeDialog} className="custom-button">{t("base.action.close")}</button>
            </ModalFooter>
        </Modal>
    );
}