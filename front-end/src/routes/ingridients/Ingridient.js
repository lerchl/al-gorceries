import { createContext, useContext, useState } from "react";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { deleteEntity } from "../../ApiUtils";
import { TableContentContext } from "../../OverviewPage";
import { EntityContext } from "../../TableContent";

export const EditDialogContext = createContext();

export const Ingridient = () => {
    const {entityApiEndpoint, setEntities, editDialog} = useContext(TableContentContext);
    const entity = useContext(EntityContext);

    const [showEditDialog, setShowEditDialog] = useState(false);

    const openEditDialog = () => {
        setShowEditDialog(true);
    }

    const closeEditDialog = () => {
        setShowEditDialog(false);
    }

    const context = {
        show: showEditDialog,
        close: closeEditDialog,
    }

    return (
        <>
            <tr key={entity._id}>
                <td>{entity.name}</td>
                <td>
                    <button onClick={openEditDialog} className="icon-button">
                        <PencilFill color="white" />
                    </button>
                    <button onClick={() => deleteEntity(entityApiEndpoint, entity._id, setEntities)} className="icon-button">
                        <TrashFill color="white" />
                    </button>
                </td>
            </tr>
            <EditDialogContext.Provider value={context}>
                {editDialog}
            </EditDialogContext.Provider>
        </>
    );
}
