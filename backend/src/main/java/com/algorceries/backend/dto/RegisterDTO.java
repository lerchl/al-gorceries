package com.algorceries.backend.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO for registering a new user.
 */
public class RegisterDTO {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String passwordRepeat;

    // /////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    // /////////////////////////////////////////////////////////////////////////

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

    public String getPasswordRepeat() {
        return passwordRepeat;
    }

    public void setPasswordRepeat(String repeatPassword) {
        this.passwordRepeat = repeatPassword;
    }
}
