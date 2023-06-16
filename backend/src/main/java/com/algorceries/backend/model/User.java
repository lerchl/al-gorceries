package com.algorceries.backend.model;

import java.util.UUID;

import com.algorceries.backend.model.household.Household;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

/**
 * {@link Entity} representing a user.
 */
@Entity(name = "algo_user")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "id")
    @JsonIgnore
    private UUID id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "salt")
    @JsonIgnore
    private String salt;

    @Column(name = "admin")
    private boolean admin;

    @ManyToOne
    @JoinColumn(name = "household_id")
    @JsonBackReference
    private Household household;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public User() {
        // default constructor for JPA
    }

    public User(String email, String password, String salt) {
        this.email = email;
        this.password = password;
        this.salt = salt;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    // /////////////////////////////////////////////////////////////////////////

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public Household getHousehold() {
        return household;
    }

    public void setHousehold(Household household) {
        this.household = household;
    }
}
