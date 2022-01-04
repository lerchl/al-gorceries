import { createContext, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";

export const DialogContext = createContext();

export const TableHead = ({columns, openAddDialogButtonTitle, addDialog, dialogTitle, setEntities, entityApiEndpoint}) => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const handleAddDialogClose = () => setShowAddDialog(false);
    const handleAddDialogOpen = () => setShowAddDialog(true);

    const context = {
        show: showAddDialog,
        close: handleAddDialogClose,
        setEntities: setEntities,
        entityApiEndpoint: entityApiEndpoint,
        dialogTitle: dialogTitle
    };

    return (
        <tr>
            {
                columns.map(column => {
                    return <th key={column}>{column}</th>;
                })
            }
            <th>
                <button onClick={handleAddDialogOpen}
                        className="icon-button"
                        title={openAddDialogButtonTitle}>
                    <PlusLg color="white" />
                </button>
                <DialogContext.Provider value={context}>
                    {addDialog}
                </DialogContext.Provider>
            </th>
        </tr>
    );
}