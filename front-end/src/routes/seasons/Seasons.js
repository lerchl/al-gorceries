import React from 'react';
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { SEASONS } from "../../ApiUtils";
import { Entity } from "../../Entity";
import { OverviewPage } from "../../OverviewPage";
import { AddSeasonDialog } from "./AddSeasonDialog";
import { EditSeasonDialog } from "./EditSeasonDialog";

export const Seasons = () => {

    const { t } = useTranslation();

    const columns = ["name", "begin", "end"]

    const getColumns = season => {
        console.log(season);
        const start = dayjs().date(season.start[2]).month(season.start[1]);
        const stop = dayjs().date(season.stop[2]).month(season.stop[1]);
        // TODO: Localization for displaying day and month
        return [season.name, start.format("DD.MM"), stop.format("DD.MM")];
    }

    return <OverviewPage headline={t("season.headline")}
                         entityApiEndpoint={SEASONS}
                         columns={columns}
                         entitiyComponent={<Entity getColumns={getColumns} />}
                         addDialog={<AddSeasonDialog />}
                         openAddDialogButtonHover={t("season.action.add")}
                         editDialog={<EditSeasonDialog />} />;
}