import { Entity } from "../../Entity"
import { OverviewPage } from "../../OverviewPage"
import { AddDishDialog } from "./AddDishDialog"

export const Dishes = () => {
    const columns = ["Name", "Quelle", "Quellzusatz", "Zubereitungszeit", "Kosten"]

    const getColumns = dish => {
        return [dish.name, dish.source, dish.sourceInformation, dish.prepTime, dish.cost];
    }

    return <OverviewPage headline="Gerichte"
                         entityApiEndpoint="dishes"
                         columns={columns}
                         entitiyComponent={<Entity getColumns={getColumns} hasDetailPage={true} />}
                         addDialog={<AddDishDialog />} addDialogTitle="Gericht hinzufügen"
                         editDialogTitle="Gericht bearbeiten" />
}