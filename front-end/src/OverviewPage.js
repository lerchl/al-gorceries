import { createContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getEntities } from "./ApiUtils";
import Menubar from "./Menubar";
import { TableContent } from "./TableContent";
import { TableHead } from "./TableHead";

export const TableContentContext = createContext();

export const OverviewPage = ({headline, entityApiEndpoint, columns, entitiyComponent, addDialog, addDialogTitle, editDialog, editDialogTitle}) => {
    const [entities, setEntities] = useState([]);

    useEffect(() => getEntities(entityApiEndpoint, setEntities), []);

    const context = {
        entityApiEndpoint: entityApiEndpoint,
        setEntities: setEntities,
        editDialog: editDialog,
        editDialogTitle: editDialogTitle
    }

    return (
        <div className="content">
            <h1>{headline}</h1>
            <Table className="custom-table">
                <thead className="position-sticky">
                    <TableHead columns={columns}
                                openAddDialogButtonTitle={"Neue Zutat hinzufügen"}
                                addDialog={addDialog}
                                dialogTitle={addDialogTitle}
                                setEntities={setEntities}
                                entityApiEndpoint={entityApiEndpoint} />
                </thead>
                <tbody>
                    <TableContentContext.Provider value={context}>
                        <TableContent entities={entities} entityComponent={entitiyComponent} />
                    </TableContentContext.Provider>
                </tbody>
            </Table>
        </div>
    );

}