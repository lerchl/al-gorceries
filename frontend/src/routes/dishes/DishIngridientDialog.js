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
    const [ingredient, setIngridient] = useState(dishIngredient?.ingredient || null);

    const title = dishIngredient ? t("dish.ingridient.dialog.edit.title") : t("dish.ingridient.dialog.add.title");

    const closeDialog = () => {
        if (!dishIngredient) {
            setFactor("");
            setMeasurement(null);
            setIngridient(null);
        }

        close();
    }

    const addDishIngridient = () => {
        const data = {
            "id": dishIngredient?.id,
            "amount": amount,
            "dishId": dishId,
            "ingredientId": ingredient.id,
            "unitOfMeasurementId": unitOfMeasurement.id
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
                               autoComplete="off" />
                </div>
                <div className="row dialog-row">
                    <Autocomplete options={measurements}
                                  getOptionLabel={m => m?.name}
                                  value={unitOfMeasurement}
                                  isOptionEqualToValue={compareEntities}
                                  onChange={(_event, value) => setMeasurement(value)}
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
                                  onChange={(_event, value) => setIngridient(value)}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("ingridient.name")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("ingridient.noOptions")}
                                  clearIcon={<></>} />
                </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" onClick={addDishIngridient} className="custom-button primary">{dishIngredient ? t("base.action.save") : t("base.action.add")}</button>
                <button type="button" onClick={closeDialog} className="custom-button">{t("base.action.close")}</button>
            </ModalFooter>
        </Modal>
    );

}