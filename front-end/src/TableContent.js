import { React, createContext } from "react";

export const EntityContext = createContext();

export const TableContent = ({entities, entityComponent}) => {
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