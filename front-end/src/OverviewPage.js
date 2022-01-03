import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Menubar from "./Menubar";
import { TableContent } from "./TableContent";
import { TableHead } from "./TableHead";

async function getEntities(entityApiEndpoint, setEntities) {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}`);
    setEntities(res.data);
}

export const TableContentContext = createContext();

export const OverviewPage = ({headline, entityApiEndpoint, columns, entitiyComponent, addDialog, addDialogTitle}) => {
    const [entities, setEntities] = useState([]);

    useEffect(() => getEntities(entityApiEndpoint, setEntities), []);

    return (
        <>
            <Menubar />
            <div className="content">
                <h1>{headline}</h1>
                <Table className="custom-table">
                    <thead className="position-sticky">
                        <TableHead columns={columns}
                                   openAddDialogButtonTitle={"Neue Zutat hinzufügen"}
                                   addDialog={addDialog}
                                   dialogTitle={addDialogTitle}
                                   getEntities={getEntities}
                                   setEntities={setEntities}
                                   entityApiEndpoint={entityApiEndpoint} />
                    </thead>
                    <tbody>
                        <TableContentContext.Provider value={{getEntities: getEntities, setEntities: setEntities, entities: entities}}>
                            <TableContent entities={entities} entityComponent={entitiyComponent} />
                        </TableContentContext.Provider>
                    </tbody>
                </Table>
            </div>
        </>
    );

}