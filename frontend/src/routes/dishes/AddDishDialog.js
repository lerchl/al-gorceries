import { Autocomplete, InputAdornment, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { React, useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CurrencyEuro } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { createEntityAndGetEntities, getEntities, MEASUREMENTS, SEASONS } from "../../ApiUtils";
import { AddEntityDialogContext } from "../../TableHead";
import { compareEntities } from "../../Entity";

export const AddDishDialog = () => {

    const { t } = useTranslation();

    const {show, close, setEntities, entityApiEndpoint} = useContext(AddEntityDialogContext);

    const [unitOfMeasurementOptions, setUnitOfMeasurementOptions] = useState([]);
    const [seasonOptions, setSeasonOptions] = useState([]);

    const [name, setName] = useState("");
    const [servingAmount, setServingAmount] = useState(1);
    const [servingUnitOfMeasurement, setServingUnitOfMeasurement] = useState(null);
    const [source, setSource] = useState("");
    const [sourceInformation, setSourceInformation] = useState("");
    const [time, setTime] = useState("");
    const [cost, setCost] = useState("");
    const [dishIngredients, setDishIngrdients] = useState([]);
    const [seasons, setSeasons] = useState([]);

    useEffect(() => getEntities(MEASUREMENTS, setUnitOfMeasurementOptions), []);
    useEffect(() => getEntities(SEASONS, setSeasonOptions), []);

    const onChange = (event, set) => {
        set(event.target.value);
    }

    const closeDialog = () => {
        setName("");
        setServingAmount(1);
        setServingUnitOfMeasurement(null);
        setSource("");
        setSourceInformation("");
        setTime(0);
        setCost(0);
        setDishIngrdients([]);
        setSeasons([]);
        close();
    }

    const saveEntitiy = () => {
        const dish = {
            "name": name,
            "servingAmount": servingAmount,
            "servingUnitOfMeasurement": servingUnitOfMeasurement,
            "source": source,
            "sourceInformation": sourceInformation,
            "time": time,
            "cost": cost,
            "dishIngredients": dishIngredients,
            "seasons": seasons
        }

        createEntityAndGetEntities(entityApiEndpoint, dish, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show} backdrop="static" onHide={closeDialog} keyboard={false} style={{ width: "100%" }}>
            <Modal.Header closeButton>
                <Modal.Title>{t("dish.dialog.add.title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row dialog-row">
                    <TextField value={name} label={t("dish.attribute.name")} onChange={event => onChange(event, setName)} />
                </div>
                <div className="row dialog-row">
                    <TextField value={servingAmount} label={t("dish.attribute.servingAmount")} onChange={event => onChange(event, setServingAmount)} type="number" className="number-input" sx={{width: "47.5%"}} />
                    <Autocomplete options={unitOfMeasurementOptions}
                                  getOptionLabel={m => m?.name}
                                  value={servingUnitOfMeasurement}
                                  isOptionEqualToValue={compareEntities}
                                  onChange={(_event, value) => setServingUnitOfMeasurement(value)}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("dish.attribute.servingUnit")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("measurement.noOptions")}
                                  clearIcon={<></>}
                                  sx={{width: "47.5%"}} />
                </div>
                <div className="row dialog-row">
                    <TextField value={source} label={t("dish.attribute.source")} onChange={event => onChange(event, setSource)} select sx={{width: "47.5%"}}>
                        <MenuItem value="HelloFresh">HelloFresh</MenuItem>
                        <MenuItem value="YouTube">YouTube</MenuItem>
                        <MenuItem value="Buch">Buch</MenuItem>
                    </TextField>
                    <TextField value={sourceInformation} label={t("dish.attribute.sourceInformation")} onChange={event => onChange(event, setSourceInformation)} sx={{width: "47.5%"}} />
                </div>
                <div className="row dialog-row">
                    <TextField value={time} label={t("dish.attribute.prepTime")} onChange={event => onChange(event, setTime)} type="number" className="number-input" InputProps={{endAdornment: <InputAdornment position="end">min</InputAdornment>}} />
                </div>
                <div className="row dialog-row">
                    <TextField value={cost} label={t("dish.attribute.cost")} onChange={event => onChange(event, setCost)} type="number" className="number-input" InputProps={{endAdornment: <CurrencyEuro color="white" />}} />
                </div>
                <div className="row dialog-row">
                    <Autocomplete options={seasonOptions}
                                  getOptionLabel={s => s.name}
                                  onChange={(_event, value) => setSeasons(value)}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("dish.attribute.seasons")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("season.noOptions")}
                                  clearIcon={<></>}
                                  multiple />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={saveEntitiy} className="custom-button primary">{t("base.action.add")}</button>
                <button type="button" onClick={closeDialog} className="custom-button">{t("base.action.close")}</button>
            </Modal.Footer>
        </Modal>
    )
}
