import { React, createContext, useEffect, useState } from "react";
import { getEntities } from "./ApiUtils";
import { TableContent } from "./TableContent";
import { TableHead } from "./TableHead";
import { useTranslation } from "react-i18next";

export const TableContentContext = createContext();

export const OverviewPage = ({headline, entityApiEndpoint, columns, entitiyComponent, addDialog, openAddDialogButtonHover, editDialog}) => {

    const { t } = useTranslation();

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
            <h1>{headline}</h1>
            <div className="table-wrapper">
                <table className="custom-table">
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
                </table>
                <div className="custom-table-footer">{ entities.length } {t("base.elements")}</div>
            </div>
        </div>
    );

}