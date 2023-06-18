package com.algorceries.backend.security;

import java.util.UUID;

public class UserPrincipal {

    private final UUID userId;
    private final String email;
    private final boolean admin;
    private final UUID householdId;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public UserPrincipal(UUID userId, String email, boolean admin, UUID householdId) {
        this.userId = userId;
        this.email = email;
        this.admin = admin;
        this.householdId = householdId;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    // /////////////////////////////////////////////////////////////////////////

    public UUID getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public boolean isAdmin() {
        return admin;
    }

    public UUID getHouseholdId() {
        return householdId;
    }
}
