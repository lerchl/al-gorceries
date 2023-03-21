package com.algorceries.backend.controller;

import java.util.Arrays;
import java.util.Optional;

import com.algorceries.backend.dto.LoginDTO;
import com.algorceries.backend.dto.RegisterDTO;
import com.algorceries.backend.model.User;
import com.algorceries.backend.service.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

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

        Optional<Cookie> tokenCookie = Arrays.stream(request.getCookies()).filter(cookie -> cookie.getName().equals("jwt")).findFirst();

        if (tokenCookie.isEmpty()) {
            return false;
        }

        return authenticationService.isLoggedIn(tokenCookie.get().getValue());
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {
        HttpCookie cookie = ResponseCookie.from("jwt", authenticationService.login(loginDTO.getEmail(), loginDTO.getPassword()))
                                        //   .httpOnly(true)
                                          .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }

    @PostMapping("/register")
    public User register(RegisterDTO registerDTO) {
        // TODO: Implement
        throw new NotYetImplementedException();
    }
}
