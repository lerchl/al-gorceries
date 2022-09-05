import { Autocomplete, InputAdornment, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CurrencyEuro } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { createEntityAndGetEntities, getEntities, SEASONS } from "../../ApiUtils";
import { AddEntityDialogContext } from "../../TableHead";

export const AddDishDialog = () => {

    const { t } = useTranslation();

    const {show, close, setEntities, entityApiEndpoint} = useContext(AddEntityDialogContext);

    const [seasonOptions, setSeasonOptions] = useState([]);

    const [name, setName] = useState("");
    const [source, setSource] = useState("");
    const [sourceInformation, setSourceInformation] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cost, setCost] = useState("");
    const [dishIngridients, setDishIngrdients] = useState([]);
    const [seasons, setSeasons] = useState([]);

    useEffect(() => getEntities(SEASONS, setSeasonOptions), []);

    const onChange = (event, set) => {
        set(event.target.value);
    }

    const closeDialog = () => {
        setName("");
        setSource("");
        setSourceInformation("");
        setPrepTime(0);
        setCost(0);
        setDishIngrdients([]);
        setSeasons([]);
        close();
    }

    const saveEntitiy = () => {
        const dish = {
            "name": name,
            "source": source,
            "sourceInformation": sourceInformation,
            "prepTime": prepTime,
            "cost": cost,
            "dishIngridients": dishIngridients,
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
                    <TextField value={source} label={t("dish.attribute.source")} onChange={event => onChange(event, setSource)} select sx={{width: "47.5%"}}>
                        <MenuItem value="HelloFresh">HelloFresh</MenuItem>
                        <MenuItem value="YouTube">YouTube</MenuItem>
                        <MenuItem value="Buch">Buch</MenuItem>
                    </TextField>
                    <TextField value={sourceInformation} label={t("dish.attribute.sourceInformation")} onChange={event => onChange(event, setSourceInformation)} sx={{width: "47.5%"}} />
                </div>
                <div className="row dialog-row">
                    <TextField value={prepTime} label={t("dish.attribute.prepTime")} onChange={event => onChange(event, setPrepTime)} type="number" className="number-input" InputProps={{endAdornment: <InputAdornment position="end">min</InputAdornment>}} />
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