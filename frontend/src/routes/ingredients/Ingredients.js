import React from "react";
import { Check2, X } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { INGREDIENTS } from "../../ApiUtils";
import { Entity } from "../../Entity";
import { OverviewPage } from "../../OverviewPage";
import { AddIngredientDialog } from "./AddIngredientDialog";
import { EditIngredientDialog } from "./EditIngredientDialog";

export const Ingredients = () => {
    const columns = ["name", "pantryStaple"];
    const getColumns = ingredient => [ingredient.name, ingredient.pantryStaple ? <Check2 /> : <X />];

	const { t } = useTranslation();

    return <OverviewPage headline={ t("ingredient.headline") }
                         entityApiEndpoint={INGREDIENTS} 
                         columns={columns}
                         entitiyComponent={<Entity getColumns={getColumns} />}
                         addDialog={<AddIngredientDialog />}
                         openAddDialogButtonHover={ t("ingredient.dialog.add.title") }
                         editDialog={<EditIngredientDialog />} />;
}