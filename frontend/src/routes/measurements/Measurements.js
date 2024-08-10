import React from "react";
import { Check2, X } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { MEASUREMENTS } from "../../ApiUtils";
import { Entity } from "../../Entity";
import { OverviewPage } from "../../OverviewPage";
import { AddMeasurementDialog } from "./AddMeasurementDialog";
import { EditMeasurementDialog } from "./EditMeasurementDialog";

export const Measurements = () => {
    const columns = ["name", "countable"];
    const getColumns = measurement => [measurement.name, measurement.countable ? <Check2 /> : <X />];

	const { t } = useTranslation();

    return <OverviewPage headline={ t("measurement.headline") }
                         entityApiEndpoint={MEASUREMENTS}
                         columns={columns}
                         entitiyComponent={<Entity getColumns={getColumns} />}
                         addDialog={<AddMeasurementDialog />}
                         openAddDialogButtonHover={ t("measurement.dialog.add.title") }
                         editDialog={<EditMeasurementDialog />} />
}