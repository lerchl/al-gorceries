import axios from "axios";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { DialogContext } from "../../TableHead";

export const AddIngridientDialog = () => {
    const {show, close, getEntities, setEntities, entityApiEndpoint, dialogTitle} = useContext(DialogContext);

    const [name, setName] = useState("");

    const onChangeName = event => {
        setName(event.target.value);
    }

    const addEntity = entity => {
        let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}`;
        axios.post(url, entity).then(res => {
            if (res.status !== 201) {
                console.log(res);
            }
            getEntities(entityApiEndpoint, setEntities);
        });
        closeDialog();
    }

    const closeDialog = () => {
        setName("");
        close();
    }

    return (
        <Modal show={show}
               backdrop="static"
               onHide={closeDialog}
               keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input value={name} onChange={onChangeName} placeholder="Name" />
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={() => addEntity({"name": name})} className="custom-button primary">Hinzufügen</button>
                <button type="button" onClick={closeDialog} className="custom-button">Schließen</button>
            </Modal.Footer>
        </Modal>
    );
}