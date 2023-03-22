package com.algorceries.backend.service;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * {@link Service} for authentication.
 */
@Service
public class AuthenticationService {
    
    private final TokenService tokenService;
    private final UserRepository userRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    @Autowired
    public AuthenticationService(TokenService tokenService, UserRepository userRepository) {
        this.tokenService =  tokenService;
        this.userRepository = userRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public boolean isLoggedIn(String token) {
        return tokenService.parseToken(token).isPresent();
    }

    public String login(String email, String password) {
        var user = userRepository.findByEmailAndPassword(email, password);

        if (user.isEmpty()) {
            throw new BadRequestException();
        }

        return tokenService.generateToken(user.get());
    }
}
