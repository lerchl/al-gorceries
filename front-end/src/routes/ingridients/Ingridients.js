import { OverviewPage } from "../../OverviewPage";
import { TableContent } from "../../TableContent";
import { Ingridient } from "./Ingridient";

export const Ingridients = () => {
    return <OverviewPage headline={"Zutaten"} entityApiEndpoint={"ingridients"} tableContent={<TableContent entityComponent={<Ingridient />} />} />;
}