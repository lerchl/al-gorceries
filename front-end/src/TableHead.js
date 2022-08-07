import { TextField } from "@mui/material";
import { createContext, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

export const AddEntityDialogContext = createContext();

export const TableHead = ({columns, openAddDialogButtonTitle, addDialog, entities, setEntities, setFilteredAndSorted, entityApiEndpoint}) => {

    const { t } = useTranslation();

    const [showAddDialog, setShowAddDialog] = useState(false);

    const closeAddDialog = () => setShowAddDialog(false);
    const openAddDialog = () => setShowAddDialog(true);

    const context = {
        show: showAddDialog,
        close: closeAddDialog,
        setEntities: setEntities,
        entityApiEndpoint: entityApiEndpoint
    };

    const filter = (event, column) => {
        if (event.target.value === "") {
            setFilteredAndSorted([...entities]);
        } else {
            setFilteredAndSorted([...entities].filter(entity => entity[column].includes(event.target.value)));
        }
    }

    return (
        <tr>
            {
                columns.map(column => {
                    return (
                        <th key={column}>
                            <div>
                                <span>{t(column)}</span>
                                { column === "name" ? <TextField onChange={event => filter(event, column)} placeholder="Filter..." /> : <></> }
                            </div>
                        </th>
                    );
                })
            }
            <th>
                <div>
                    <button onClick={openAddDialog}
                            className="icon-button"
                            title={openAddDialogButtonTitle}>
                        <PlusLg color="white" />
                    </button>
                    <AddEntityDialogContext.Provider value={context}>
                        {addDialog}
                    </AddEntityDialogContext.Provider>
                </div>
            </th>
        </tr>
    );
}