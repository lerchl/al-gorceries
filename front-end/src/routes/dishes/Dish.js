import { useContext, useState } from "react"
import { TableContentContext } from "../../OverviewPage"
import { EntityContext } from "../../TableContent";

export const Dish = () => {
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
        close: closeEditDialog
    }

    return (
        <>
            <tr key={entity._id}>
                <td>

                </td>
            </tr>
        </>
    );
}