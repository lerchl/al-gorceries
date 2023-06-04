import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DISH_INGREDIENTS, updateEntityAndGetEntitiesWithParam } from "../../ApiUtils";

export const EditDishIngridientDialog = ({show, close, dishId, setDishIngridients, dishIngridient, measurements, ingridients}) => {

    const { t } = useTranslation();

    const [amount, setAmount] = useState(dishIngridient.amount);
    const [measurement, setMeasurement] = useState(dishIngridient.unitOfMeasurement);
    const [ingridient, setIngridient] = useState(dishIngridient.ingredient);

    const closeDialog = () => {
        setAmount(dishIngridient.factor);
        setMeasurement(dishIngridient.measurement);
        setIngridient(dishIngridient.ingridient);
        close();
    }

    const saveDishIngridient = () => {
        dishIngridient.factor = amount;
        dishIngridient.measurement = measurement;
        dishIngridient.ingridient = ingridient;
        updateEntityAndGetEntitiesWithParam(DISH_INGREDIENTS, dishIngridient, setDishIngridients, dishId);
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
                    <Autocomplete value={ingridient}
                                  options={ingridients}
                                  getOptionLabel={i => i.name}
                                  onChange={(_event, value) => setIngridient(value)}
                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("ingridient.name")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("ingridient.noOptions")}
                                  clearIcon={<></>} />
                </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" onClick={saveDishIngridient} className="custom-button primary">{t("base.action.save")}</button>
                <button type="button" onClick={closeDialog} className="custom-button">{t("base.action.close")}</button>
            </ModalFooter>
        </Modal>
    );
}