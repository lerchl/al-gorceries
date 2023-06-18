package com.algorceries.backend.model;

import com.algorceries.backend.model.household.Household;

public interface HouseholdScopedEntity extends Entity {

    Household getHousehold();
    void setHousehold(Household household);
}
