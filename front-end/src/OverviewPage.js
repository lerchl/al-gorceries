import { createContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getEntities } from "./ApiUtils";
import { TableContent } from "./TableContent";
import { TableHead } from "./TableHead";

export const TableContentContext = createContext();

export const OverviewPage = ({headline, entityApiEndpoint, columns, entitiyComponent, addDialog, openAddDialogButtonHover, editDialog}) => {
    const [entities, setEntities] = useState([]);

    useEffect(() => getEntities(entityApiEndpoint, setEntities), []);

    const context = {
        entityApiEndpoint: entityApiEndpoint,
        setEntities: setEntities,
        editDialog: editDialog
    }

    return (
        <div className="content">
            <h1>{headline}</h1>
            <Table className="custom-table">
                <thead className="position-sticky">
                    <TableHead columns={columns}
                                openAddDialogButtonTitle={openAddDialogButtonHover}
                                addDialog={addDialog}
                                entities={entities}
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