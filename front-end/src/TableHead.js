import { createContext, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";

export const AddEntityDialogContext = createContext();

export const TableHead = ({columns, openAddDialogButtonTitle, addDialog, setEntities, entityApiEndpoint}) => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const closeAddDialog = () => setShowAddDialog(false);
    const openAddDialog = () => setShowAddDialog(true);

    const context = {
        show: showAddDialog,
        close: closeAddDialog,
        setEntities: setEntities,
        entityApiEndpoint: entityApiEndpoint
    };

    return (
        <tr>
            {
                columns.map(column => {
                    return <th key={column}>{column}</th>;
                })
            }
            <th>
                <button onClick={openAddDialog}
                        className="icon-button"
                        title={openAddDialogButtonTitle}>
                    <PlusLg color="white" />
                </button>
                <AddEntityDialogContext.Provider value={context}>
                    {addDialog}
                </AddEntityDialogContext.Provider>
            </th>
        </tr>
    );
}