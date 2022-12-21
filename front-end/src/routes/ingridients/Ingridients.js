import React from "react";
import { Entity } from "../../Entity";
import { OverviewPage } from "../../OverviewPage";
import { AddIngridientDialog } from "./AddIngridientDialog";
import { EditIngridientDialog } from "./EditIngridientDialog";

export const Ingridients = () => {
    const columns = ["name"];
    const getColumns = ingridient => [ingridient.name];

    return <OverviewPage headline="Zutaten" 
                         entityApiEndpoint="ingridients" 
                         columns={columns}
                         entitiyComponent={<Entity getColumns={getColumns} />}
                         addDialog={<AddIngridientDialog />}
                         openAddDialogButtonHover={"Neue Zutat hinzufügen"}
                         editDialog={<EditIngridientDialog />} />;
}