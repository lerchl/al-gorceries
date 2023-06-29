package com.algorceries.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.model.User;
import com.algorceries.backend.repository.UserRepository;

import io.jsonwebtoken.ExpiredJwtException;

/**
 * {@link Service} for authentication.
 */
@Service
public class AuthenticationService {

    private final TokenService tokenService;
    private final UserRepository userRepository;

    @Value("${authentication.pepper}")
    private String pepper;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public AuthenticationService(TokenService tokenService, UserRepository userRepository) {
        this.tokenService =  tokenService;
        this.userRepository = userRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public boolean isLoggedIn(String token) {
        try {
            return tokenService.parseToken(token).isPresent();
        } catch (ExpiredJwtException e) {
            return false;
        }
    }

    public String login(String email, String password) {
        var optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new BadRequestException();
        }

        var user = optionalUser.get();

        if (!user.getPassword().equals(BCrypt.hashpw(password + pepper, user.getSalt()))) {
            throw new BadRequestException();
        }

        return tokenService.generateToken(optionalUser.get());
    }

    public void register(String email, String password, String passwordRepeat) {
        if (!password.equals(passwordRepeat)) {
            throw new IllegalArgumentException("Repeat password");
        }

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email");
        }

        var salt = BCrypt.gensalt();
        var passwordHash = BCrypt.hashpw(password + pepper, salt);

        userRepository.save(new User(email, passwordHash, salt));
    }

    public void logout(String token) {
        tokenService.blockToken(token);
    }
}
