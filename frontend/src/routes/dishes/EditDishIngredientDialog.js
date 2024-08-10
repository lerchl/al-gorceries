import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DISH_INGREDIENTS, updateEntityAndGetEntitiesWithParam } from "../../ApiUtils";

export const EditDishIngredientDialog = ({show, close, dishId, setDishIngredients, dishIngredient, measurements, ingredients}) => {

    const { t } = useTranslation();

    const [amount, setAmount] = useState(dishIngredient.amount);
    const [measurement, setMeasurement] = useState(dishIngredient.unitOfMeasurement);
    const [ingredient, setIngredient] = useState(dishIngredient.ingredient);

    const closeDialog = () => {
        setAmount(dishIngredient.factor);
        setMeasurement(dishIngredient.measurement);
        setIngredient(dishIngredient.ingredient);
        close();
    }

    const saveDishIngredient = () => {
        dishIngredient.factor = amount;
        dishIngredient.measurement = measurement;
        dishIngredient.ingredient = ingredient;
        updateEntityAndGetEntitiesWithParam(DISH_INGREDIENTS, dishIngredient, setDishIngredients, dishId);
        closeDialog();
    }

    return (
        <Modal show={show} backdrop="static" onHide={closeDialog} keyboard={false}>
            <Modal.Header closeButton>
                <ModalTitle>Zutat bearbeiten</ModalTitle>
            </Modal.Header>
            <ModalBody>
                <div className="row dialog-row">
                    <TextField label="Menge"
                               value={amount}
                               onChange={e => setAmount(e.target.value)}
                               type="number"
                               className="number-input"
                               inputProps={{ inputMode: "numeric" }}
                               autoComplete="off" />
                </div>
                <div className="row dialog-row">
                    <Autocomplete value={measurement}
                                  options={measurements}
                                  getOptionLabel={m => m.name}
                                  onChange={(_event, value) => setMeasurement(value)}
                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("measurement.name")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("measurement.noOptions")}
                                  clearIcon={<></>} />
                </div>
                <div className="row dialog-row">
                    <Autocomplete value={ingredient}
                                  options={ingredients}
                                  getOptionLabel={i => i.name}
                                  onChange={(_event, value) => setIngredient(value)}
                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("ingredient.name")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("ingredient.noOptions")}
                                  clearIcon={<></>} />
                </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" onClick={saveDishIngredient} className="custom-button primary">{t("base.action.save")}</button>
                <button type="button" onClick={closeDialog} className="custom-button">{t("base.action.close")}</button>
            </ModalFooter>
        </Modal>
    );
}