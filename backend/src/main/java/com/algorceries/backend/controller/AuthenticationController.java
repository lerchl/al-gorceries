package com.algorceries.backend.controller;

import static org.springframework.http.HttpStatus.NO_CONTENT;

import java.util.Arrays;
import java.util.Optional;

import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.dto.LoginDTO;
import com.algorceries.backend.dto.RegisterDTO;
import com.algorceries.backend.service.AuthenticationService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
public class AuthenticationController {

    private static final String TOKEN_COOKIE_NAME = "jwt";

    private final AuthenticationService authenticationService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping("/loggedIn")
    public boolean isLoggedIn(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return false;
        }

        Optional<Cookie> tokenCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(TOKEN_COOKIE_NAME))
                .findFirst();

        if (tokenCookie.isEmpty()) {
            return false;
        }

        return authenticationService.isLoggedIn(tokenCookie.get().getValue());
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {
        HttpCookie cookie = ResponseCookie.from(TOKEN_COOKIE_NAME, authenticationService.login(loginDTO.getEmail(), loginDTO.getPassword()))
                                          .httpOnly(true)
                                          .path("/")
                                          .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }

    @PostMapping("/register")
    @ResponseStatus(NO_CONTENT)
    public void register(@RequestBody @Valid RegisterDTO registerDTO) {
        authenticationService.register(registerDTO.getEmail(), registerDTO.getPassword(), registerDTO.getPasswordRepeat());
    }
}
