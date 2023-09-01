package com.algorceries.backend.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {

    @Mock
    private TokenService tokenService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthenticationService authenticationService;

    // /////////////////////////////////////////////////////////////////////////
    // Tests
    // /////////////////////////////////////////////////////////////////////////

    @Test
    public void loginWithUnknownEmail() {
        // arrange
        final String email = "does@not.exist";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // act / assert
        assertThrows(BadRequestException.class, () -> authenticationService.login(email, "password"));
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    public void registerWithNonMatchingPasswords() {
        // act / assert
        var e = assertThrows(IllegalArgumentException.class, () -> authenticationService.register("email", "password", "doesNotMatch"));
        assertEquals("Repeat password", e.getMessage());
    }

    @Test
    public void registerWithAlreadyRegisteredEmail() {
        // arrange
        final String email = "already@registered.com";
        final String password = "password";
        when(userRepository.existsByEmail(email)).thenReturn(true);

        // act / assert
        var e = assertThrows(IllegalArgumentException.class, () -> authenticationService.register(email, password, password));
        assertEquals("Email", e.getMessage());
        verify(userRepository, times(1)).existsByEmail(email);
    }
}
