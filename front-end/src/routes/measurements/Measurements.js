import { MEASUREMENTS } from "../../ApiUtils";
import { Entity } from "../../Entity";
import { OverviewPage } from "../../OverviewPage";
import { AddMeasurementDialog } from "./AddMeasurementDialog";
import { EditMeasurementDialog } from "./EditMeasurementDialog";

export const Measurements = () => {
    const columns = ["name"];
    const getColumns = measurement => [measurement.name];

    return <OverviewPage headline={"Maßeinheiten"}
                         entityApiEndpoint={MEASUREMENTS}
                         columns={columns}
                         entitiyComponent={<Entity getColumns={getColumns} />}
                         addDialog={<AddMeasurementDialog />}
                         openAddDialogButtonHover={"Neue Maßeinheit hinzufügen"}
                         editDialog={<EditMeasurementDialog />} />
}