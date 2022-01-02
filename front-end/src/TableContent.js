import { createContext, useContext } from "react";
import { TableContentContext } from "./OverviewPage";

export const EntityContext = createContext();

export const TableContent = ({entityComponent}) => {
    const {entities} = useContext(TableContentContext);

    return (
        entities.map(entity => {
            return (
                <EntityContext.Provider value={entity} key={entity._id}>
                    {entityComponent}
                </EntityContext.Provider>
            );
        })
    );
}