import { useTranslation } from "react-i18next";
import { OverviewPage } from "../../OverviewPage";

export const Seasons = () => {
    
    const { t } = useTranslation();
    
    const columns = ["name", "begin", "end"]

    return <OverviewPage headline={t("season.headline")}
                         entityApiEndpoint="seasons"
                         columns={columns} />;
}