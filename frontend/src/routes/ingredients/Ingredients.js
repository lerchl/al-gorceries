import React from "react";
import { INGREDIENTS } from "../../ApiUtils";
import { Entity } from "../../Entity";
import { OverviewPage } from "../../OverviewPage";
import { AddIngredientDialog } from "./AddIngredientDialog";
import { EditIngredientDialog } from "./EditIngredientDialog";

export const Ingredients = () => {
    const columns = ["name"];
    const getColumns = ingredient => [ingredient.name];

    return <OverviewPage headline="Zutaten" 
                         entityApiEndpoint={INGREDIENTS} 
                         columns={columns}
                         entitiyComponent={<Entity getColumns={getColumns} />}
                         addDialog={<AddIngredientDialog />}
                         openAddDialogButtonHover={"Neue Zutat hinzufügen"}
                         editDialog={<EditIngredientDialog />} />;
}