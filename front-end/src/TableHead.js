import { createContext, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";

export const AddEntityDialogContext = createContext();

export const TableHead = ({columns, openAddDialogButtonTitle, addDialog, entities, setEntities, entityApiEndpoint}) => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const closeAddDialog = () => setShowAddDialog(false);
    const openAddDialog = () => setShowAddDialog(true);

    const context = {
        show: showAddDialog,
        close: closeAddDialog,
        setEntities: setEntities,
        entityApiEndpoint: entityApiEndpoint
    };

    const sort = column => {
        if (entities.length === 0) {
            return entities;
        }

        // + 1 as every entity has its id as their first property
        const index = columns.indexOf(column) + 1;
        const property = Object.keys(entities[0])[index];
        setEntities([...entities].sort((a, b) => a[property] < b[property]));
        console.log(entities);
        // entities[0] = {};
        // return entities;
    }

    return (
        <tr>
            {
                columns.map(column => {
                    return <th key={column} onClick={() => sort(column)}>{column}</th>;
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