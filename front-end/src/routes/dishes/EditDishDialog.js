import { InputAdornment, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { CurrencyEuro } from "react-bootstrap-icons";
import { updateEntityAndGetEntities } from "../../ApiUtils";
import { EditDialogContext } from "../../Entity";
import { TableContentContext } from "../../OverviewPage";
import { EntityContext } from "../../TableContent";

export const EditDishDialog = () => {
    const {entityApiEndpoint, setEntities} = useContext(TableContentContext);
    const entity = useContext(EntityContext);
    const {show, close} = useContext(EditDialogContext);

    const [name, setName] = useState(entity.name);
    const [source, setSource] = useState(entity.source);
    const [sourceInformation, setSourceInformation] = useState(entity.sourceInformation);
    const [prepTime, setPrepTime] = useState(entity.prepTime);
    const [cost, setCost] = useState(entity.cost);

    const closeDialog = () => {
        setName(entity.name);
        setSource(entity.source);
        setSourceInformation(entity.sourceInformation);
        setPrepTime(entity.prepTime);
        setCost(entity.cost);
        close();
    }

    const saveEntitiy = () => {
        entity.name = name;
        entity.source = source;
        entity.sourceInformation = sourceInformation;
        entity.prepTime = prepTime;
        entity.cost = cost;
        updateEntityAndGetEntities(entityApiEndpoint, entity, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show} backdrop="static" onHide={closeDialog} keyboard={false}>
            <Modal.Header closeButton>
                <ModalTitle>Gericht bearbeiten</ModalTitle>
            </Modal.Header>
            <ModalBody>
                <div className="row dialog-row">
                    <TextField value={name} label="Name" onChange={e => setName(e.target.value)} />
                </div>
                <div className="row dialog-row">
                    <TextField value={source} label="Quelle" onChange={e => setSource(e.target.value)} select sx={{width: "47.5%"}}>
                        <MenuItem value="HelloFresh">HelloFresh</MenuItem>
                        <MenuItem value="YouTube">YouTube</MenuItem>
                        <MenuItem value="Buch">Buch</MenuItem>
                    </TextField>
                    <TextField value={sourceInformation} label="Quellzusatz" onChange={e => setSourceInformation(e.target.value)} sx={{width: "47.5%"}} />
                </div>
                <div className="row dialog-row">
                    <TextField value={prepTime} label="Zubereitungszeit" onChange={e => setPrepTime(e.target.value)} type="number" className="number-input" InputProps={{endAdornment: <InputAdornment position="end">min</InputAdornment>}} />
                </div>
                <div className="row dialog-row">
                    <TextField value={cost} label="Kosten" onChange={e => setCost(e.target.value)} type="number" className="number-input" InputProps={{endAdornment: <CurrencyEuro color="white" />}} />
                </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" onClick={saveEntitiy} className="custom-button primary">Speichern</button>
                <button type="button" onClick={closeDialog} className="custom-button">Schließen</button>
            </ModalFooter>
        </Modal>
    )
}