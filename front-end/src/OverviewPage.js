import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import Menubar from "./Menubar";

async function getEntities(entityApiEndpoint, setEntities) {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}`);
    setEntities(res.data);
}

export const TableContentContext = createContext();

export const OverviewPage = ({headline, entityApiEndpoint, tableContent}) => {
    const [entities, setEntities] = useState([]);

    useEffect(() => getEntities(entityApiEndpoint, setEntities), []);

    const [showAddDialog, setShowAddDialog] = useState(false);
    const handleAddDialogClose = () => setShowAddDialog(false);
    const handleAddDialogOpen = () => setShowAddDialog(true);

    return (
        <>
            <Menubar />
            <div className="content">
                <h1>{headline}</h1>
                <Table className="custom-table">
                    <thead className="position-sticky">
                        <tr>
                            <th>Bezeichnung</th>
                            <th>
                                <button onClick={handleAddDialogOpen}
                                        className="icon-button"
                                        title="Neue Maßeinheit erstellen">
                                    <PlusLg color="white" />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableContentContext.Provider value={{getEntities: getEntities, setEntities: setEntities, entities: entities}}>
                            {tableContent}
                        </TableContentContext.Provider>
                    </tbody>
                </Table>
            </div>
        </>
    );

}