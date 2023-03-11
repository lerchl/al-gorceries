package com.algorceries.backend.security;

import java.util.UUID;

public class UserPrincipal {

    private final UUID userId;
    private final String email;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public UserPrincipal(UUID userId, String email) {
        this.userId = userId;
        this.email = email;
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
}
