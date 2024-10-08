import { React, createContext, useContext, useState } from "react";
import { BoxArrowUpRight, PencilFill, TrashFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { deleteEntityAndGetEntities } from "./ApiUtils";
import { TableContentContext } from "./OverviewPage";
import { EntityContext } from "./TableContent";

export const EditDialogContext = createContext();

export const Entity = ({getColumns, hasDetailPage = false}) => {

    const { t } = useTranslation();

    const {entityApiEndpoint, setEntities, editDialog} = useContext(TableContentContext);
    const entity = useContext(EntityContext);

    const [showEditDialog, setShowEditDialog] = useState(false);

    const openEditDialog = () => {
        setShowEditDialog(true);
    }

    const closeEditDialog = () => {
        setShowEditDialog(false);
    }

    const context = {
        show: showEditDialog,
        close: closeEditDialog,
    }

    return (
        <>
            <tr key={entity.id}>
                {
                    getColumns(entity).map(column => {
                        return <td key={v4()}>{column}</td>;
                    })
                }
                <td>
                    { hasDetailPage && <Link to={entity.id}><BoxArrowUpRight color="white" /></Link> }
                    <button onClick={openEditDialog} className="icon-button ml-2" title={t("base.action.edit")}>
                        <PencilFill color="white" />
                    </button>
                    <button onClick={() => deleteEntityAndGetEntities(entityApiEndpoint, entity.id, setEntities)}
                            className="icon-button ml-2"
                            title={t("base.action.delete")}>
                        <TrashFill color="white" />
                    </button>
                </td>
            </tr>
            <EditDialogContext.Provider value={context}>
                {editDialog}
            </EditDialogContext.Provider>
        </>
    );
}

export const compareEntities = (e1, e2) => {
    return e1.id === e2.id;
}
