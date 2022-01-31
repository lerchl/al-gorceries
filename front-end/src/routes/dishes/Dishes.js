import { useEffect, useState } from "react"
import { Entity } from "../../Entity"
import { OverviewPage } from "../../OverviewPage"
import { AddDishDialog } from "./AddDishDialog"
import { EditDishDialog } from "./EditDishDialog"

export const Dishes = () => {

    const [width, setWidth] = useState(window.innerWidth);

    const isMobile = width <= 768;
    const columns = ["Name"]

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
        columns.push("Quelle", "Zubereitungszeit", "Kosten");
    }

    const getColumns = dish => {
        if (isMobile) {
            return [dish.name];
        } else {
            return [dish.name, dish.source, dish.prepTime + " Minuten", dish.cost + "€"];
        }
    }

    return <OverviewPage headline="Gerichte" entityApiEndpoint="dishes" columns={columns}
                         entitiyComponent={<Entity getColumns={getColumns} hasDetailPage={true} />}
                         addDialog={<AddDishDialog />} addDialogTitle="Gericht hinzufügen"
                         editDialog={<EditDishDialog />} editDialogTitle="Gericht bearbeiten" />
}