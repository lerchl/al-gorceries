import { Autocomplete, InputAdornment, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { React, useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { CurrencyEuro } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { updateEntityAndGetEntities } from "../../ApiUtils";
import { EditDialogContext, compareEntities } from "../../Entity";
import { TableContentContext } from "../../OverviewPage";
import { EntityContext } from "../../TableContent";

export const EditDishDialog = ({ unitOfMeasurementOptions, seasonOptions }) => {

    const { t } = useTranslation();

    const {entityApiEndpoint, setEntities} = useContext(TableContentContext);
    const entity = useContext(EntityContext);
    const {show, close} = useContext(EditDialogContext);

    const [name, setName] = useState(entity.name);
    const [servingAmount, setServingAmount] = useState(entity.servingAmount);
    const [servingUnit, setServingUnit] = useState(entity.servingUnitOfMeasurement);
    const [source, setSource] = useState(entity.source);
    const [sourceInformation, setSourceInformation] = useState(entity.sourceInformation);
    const [time, setTime] = useState(entity.time);
    const [cost, setCost] = useState(entity.cost);
    const [seasons, setSeasons] = useState(entity.seasons);

    const closeDialog = () => {
        setName(entity.name);
        setSource(entity.source);
        setSourceInformation(entity.sourceInformation);
        setTime(entity.time);
        setCost(entity.cost);
        setSeasons(entity.seasons);
        close();
    }

    const saveEntitiy = () => {
        entity.name = name;
        entity.servingAmount = servingAmount;
        entity.servingUnitOfMeasurement = servingUnit;
        entity.source = source;
        entity.sourceInformation = sourceInformation;
        entity.time = time;
        entity.cost = cost;
        entity.seasons = seasons;
        updateEntityAndGetEntities(entityApiEndpoint, entity, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show} backdrop="static" onHide={closeDialog} keyboard={false}>
            <Modal.Header closeButton>
                <ModalTitle>{t("dish.dialog.edit.title")}</ModalTitle>
            </Modal.Header>
            <ModalBody>
                <div className="row dialog-row">
                    <TextField value={name} label={t("dish.attribute.name")} onChange={e => setName(e.target.value)} />
                </div>
                <div className="row dialog-row">
                    <TextField value={servingAmount} label={t("dish.attribute.servingAmount")} onChange={e => setServingAmount(e.target.value)} type="number" className="number-input" sx={{width: "47.5%"}} />
                    <Autocomplete options={unitOfMeasurementOptions}
                                  getOptionLabel={m => m?.name}
                                  value={servingUnit}
                                  isOptionEqualToValue={compareEntities}
                                  onChange={(_event, value) => setServingUnit(value)}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("dish.attribute.servingUnit")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("measurement.noOptions")}
                                  clearIcon={<></>}
                                  sx={{width: "47.5%"}} />
                </div>
                <div className="row dialog-row">
                    <TextField value={source} label={t("dish.attribute.source")} onChange={e => setSource(e.target.value)} select sx={{width: "47.5%"}}>
                        <MenuItem value="HelloFresh">HelloFresh</MenuItem>
                        <MenuItem value="YouTube">YouTube</MenuItem>
                        <MenuItem value="Buch">Buch</MenuItem>
                    </TextField>
                    <TextField value={sourceInformation} label={t("dish.attribute.sourceInformation")} onChange={e => setSourceInformation(e.target.value)} sx={{width: "47.5%"}} />
                </div>
                <div className="row dialog-row">
                    <TextField value={time} label={t("dish.attribute.prepTime")} onChange={e => setTime(e.target.value)} type="number" className="number-input" InputProps={{endAdornment: <InputAdornment position="end">min</InputAdornment>}} />
                </div>
                <div className="row dialog-row">
                    <TextField value={cost} label={t("dish.attribute.cost")} onChange={e => setCost(e.target.value)} type="number" className="number-input" InputProps={{endAdornment: <CurrencyEuro color="white" />}} />
                </div>
                <div className="row dialog-row">
                    <Autocomplete value={seasons}
                                  options={seasonOptions}
                                  getOptionLabel={s => s.name}
                                  onChange={(_event, value) => setSeasons(value)}
                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("dish.attribute.seasons")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("season.noOptions")}
                                  clearIcon={<></>}
                                  multiple />
                </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" onClick={saveEntitiy} className="custom-button primary">{t("base.action.save")}</button>
                <button type="button" onClick={closeDialog} className="custom-button">{t("base.action.close")}</button>
            </ModalFooter>
        </Modal>
    )
}