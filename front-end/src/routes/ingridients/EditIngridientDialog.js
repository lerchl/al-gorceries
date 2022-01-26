import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { updateEntityAndGetEntities } from "../../ApiUtils";
import { TableContentContext } from "../../OverviewPage";
import { EntityContext } from "../../TableContent";
import { EditDialogContext } from "./Ingridient";

export const EditIngridientDialog = () => {
    const {entityApiEndpoint, setEntities, editDialogTitle} = useContext(TableContentContext);
    const entity = useContext(EntityContext);
    const {show, close} = useContext(EditDialogContext);

    const [name, setName] = useState(entity.name);

    const onChangeName = event => {
        setName(event.target.value);
    }

    const saveEntity = () => {
        entity.name = name;
        updateEntityAndGetEntities(entityApiEndpoint, entity, setEntities);
        close();
    }

    return (
        <Modal show={show}
               onHide={close}
               backdrop="static"
               keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{editDialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input value={name} onChange={onChangeName} placeholder="Name" />
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={saveEntity} className="custom-button primary">Speichern</button>
                <button type="button" onClick={close} className="custom-button">Schließen</button>
            </Modal.Footer>
        </Modal>
    );
}