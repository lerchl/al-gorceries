import { React, createContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getEntities } from "./ApiUtils";
import { TableContent } from "./TableContent";
import { TableHead } from "./TableHead";

export const TableContentContext = createContext();

export const OverviewPage = ({headline, entityApiEndpoint, columns, entitiyComponent, addDialog, openAddDialogButtonHover, editDialog}) => {
    const [entities, setEntities] = useState([]);
    const [filteredAndSorted, setFilteredAndSorted] = useState([]);

    useEffect(() => getEntities(entityApiEndpoint, setEntities), []);
    useEffect(() => setFilteredAndSorted(entities), [entities]);

    const context = {
        entityApiEndpoint: entityApiEndpoint,
        setEntities: setEntities,
        editDialog: editDialog
    }

    return (
        <div className="content">
            <div className="widget widget-pink-1">
                <h1>{headline}</h1>
                <Table className="custom-table">
                    <thead className="position-sticky">
                        <TableHead columns={columns}
                                    openAddDialogButtonTitle={openAddDialogButtonHover}
                                    addDialog={addDialog}
                                    entities={entities}
                                    setEntities={setEntities}
                                    setFilteredAndSorted={setFilteredAndSorted}
                                    entityApiEndpoint={entityApiEndpoint} />
                    </thead>
                    <tbody>
                        <TableContentContext.Provider value={context}>
                            <TableContent entities={filteredAndSorted} entityComponent={entitiyComponent} />
                        </TableContentContext.Provider>
                    </tbody>
                </Table>
            </div>
        </div>
    );

}