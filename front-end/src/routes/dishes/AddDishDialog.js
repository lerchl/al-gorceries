import { InputAdornment, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { CurrencyEuro } from "react-bootstrap-icons";
import { createEntityAndGetEntities } from "../../ApiUtils";
import { AddEntityDialogContext } from "../../TableHead";

export const AddDishDialog = () => {
    const {show, close, setEntities, entityApiEndpoint} = useContext(AddEntityDialogContext);

    const [name, setName] = useState("");
    const [source, setSource] = useState("");
    const [sourceInformation, setSourceInformation] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cost, setCost] = useState("");
    const [dishIngridients, setDishIngrdients] = useState([]);

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
        close();
    }

    const saveEntitiy = () => {
        const dish = {
            "name": name,
            "source": source,
            "sourceInformation": sourceInformation,
            "prepTime": prepTime,
            "cost": cost,
            "dishIngridients": dishIngridients
        }
        createEntityAndGetEntities(entityApiEndpoint, dish, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show} backdrop="static" onHide={closeDialog} keyboard={false} style={{ width: "100%" }}>
            <Modal.Header closeButton>
                <Modal.Title>Gericht hinzufügen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row dialog-row">
                    <TextField value={name} label="Name" onChange={event => onChange(event, setName)} />
                </div>
                <div className="row dialog-row">
                    <TextField value={source} label="Quelle" onChange={event => onChange(event, setSource)} select sx={{width: "47.5%"}}>
                        <MenuItem value="HelloFresh">HelloFresh</MenuItem>
                        <MenuItem value="YouTube">YouTube</MenuItem>
                        <MenuItem value="Buch">Buch</MenuItem>
                    </TextField>
                    <TextField label="Quellzusatz" onChange={event => onChange(event, setSourceInformation)} sx={{width: "47.5%"}} />
                </div>
                <div className="row dialog-row">
                    <TextField value={prepTime} label="Zubereitungszeit" onChange={event => onChange(event, setPrepTime)} type="number" className="number-input" InputProps={{endAdornment: <InputAdornment position="end">min</InputAdornment>}} />
                </div>
                <div className="row dialog-row">
                    <TextField value={cost} label="Kosten" onChange={event => onChange(event, setCost)} type="number" className="number-input" InputProps={{endAdornment: <CurrencyEuro color="white" />}} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={saveEntitiy} className="custom-button primary">Hinzufügen</button>
                <button type="button" onClick={closeDialog} className="custom-button">Schließen</button>
            </Modal.Footer>
        </Modal>
    )
}