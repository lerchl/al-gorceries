package com.algorceries.backend.model.household;

import java.time.LocalDateTime;
import java.util.UUID;

import com.algorceries.backend.model.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

/**
 * {@link Entity} representing a household join request.
 */
@Entity(name = "algo_household_join_request")
public class HouseholdJoinRequest {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "household_id", nullable = false)
    @NotNull
    private Household household;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @NotNull
    private User user;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdJoinRequest() {
        // default constructor for jpa
    }

    public HouseholdJoinRequest(Household household, User user) {
        this.household = household;
        this.user = user;
        this.createdAt = LocalDateTime.now();
    }

    // /////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    // /////////////////////////////////////////////////////////////////////////

    public UUID getId() {
        return id;
    }

    public Household getHousehold() {
        return household;
    }

    public void setHousehold(Household household) {
        this.household = household;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
