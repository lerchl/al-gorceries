import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { createEntityAndGetEntitiesWithParam, DISH_INGREDIENTS } from "../../ApiUtils";

export const AddDishIngridientDialog = ({show, close, dishId, setDishIngridients, measurements, ingridients}) => {

    const { t } = useTranslation();

    const [amount, setFactor] = useState("");
    const [unitOfMeasurementId, setMeasurementId] = useState("");
    const [ingredientId, setIngridientId] = useState("");

    const closeDialog = () => {
        setFactor("");
        setMeasurementId("");
        setIngridientId("");
        close();
    }

    const addDishIngridient = () => {
        const dishIngredient = {
            "amount": amount,
            "dishId": dishId,
            "ingredientId": ingredientId,
            "unitOfMeasurementId": unitOfMeasurementId
        }
        createEntityAndGetEntitiesWithParam(DISH_INGREDIENTS, dishIngredient, setDishIngridients, dishId);
        closeDialog();
    }

    return (
        <Modal show={show} backdrop="static" onHide={closeDialog} keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{t("dish.ingridient.dialog.add.title")}</Modal.Title>
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
                                  getOptionLabel={m => m.name}
                                  onChange={(_event, value) => setMeasurementId(value?.id)}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("measurement.name")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("measurement.noOptions")}
                                  clearIcon={<></>} />
                </div>
                <div className="row dialog-row">
                    <Autocomplete options={ingridients}
                                  getOptionLabel={i => i.name}
                                  onChange={(_event, value) => setIngridientId(value?.id)}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("ingridient.name")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("ingridient.noOptions")}
                                  clearIcon={<></>} />
                </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" onClick={addDishIngridient} className="custom-button primary">{t("base.action.add")}</button>
                <button type="button" onClick={closeDialog} className="custom-button">{t("base.action.close")}</button>
            </ModalFooter>
        </Modal>
    );

}