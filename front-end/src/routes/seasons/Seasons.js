import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Entity } from "../../Entity";
import { OverviewPage } from "../../OverviewPage";
import { AddSeasonDialog } from "./AddSeasonDialog";

export const Seasons = () => {
    
    const { t } = useTranslation();
    
    const columns = ["name", "begin", "end"]

    const getColumns = season => {
        console.log(season);
        const begin = dayjs().date(season.beginDay).month(season.beginMonth);
        const end = dayjs().date(season.endDay).month(season.endMonth);
        // TODO: Localization for displaying day and month
        return [season.name, begin.format("DD.MM"), end.format("DD.MM")];
    }

    return <OverviewPage headline={t("season.headline")}
                         entityApiEndpoint="seasons"
                         columns={columns}
                         entitiyComponent={<Entity getColumns={getColumns} />}
                         addDialog={<AddSeasonDialog />} />;
}