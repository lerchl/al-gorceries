import { React, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { getEntities, SEASONS } from "../../ApiUtils"
import { Entity } from "../../Entity"
import { OverviewPage } from "../../OverviewPage"
import { AddDishDialog } from "./AddDishDialog"
import { EditDishDialog } from "./EditDishDialog"

export const Dishes = () => {

    const { t } = useTranslation();

    const [seasons, setSeasons] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);

    const isMobile = width <= 768;
    const columns = ["name"];

    useEffect(() => getEntities(SEASONS, setSeasons), []);
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    if (!isMobile) {
        columns.push("source", "prepTime", "cost", "seasons");
    }

    const getColumns = dish => {
        if (isMobile) {
            return [dish.name];
        } else {
            return [dish.name, dish.source, dish.prepTime + " Minuten", dish.cost + "€", dish.seasons.map(s => s.name).join(", ")];
        }
    }

    return <OverviewPage headline="Gerichte"
            entityApiEndpoint="dishes"
            columns={columns}
            entitiyComponent={<Entity getColumns={getColumns} hasDetailPage={true} />}
            addDialog={<AddDishDialog />}
            openAddDialogButtonHover={t("dish.dialog.add.buttonHover")}
            editDialog={<EditDishDialog seasonOptions={seasons} />} />
}