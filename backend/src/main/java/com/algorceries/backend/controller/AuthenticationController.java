package com.algorceries.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @PostMapping("/login")
    public ResponseEntity<?> login() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/loggedIn")
    public ResponseEntity<Boolean> isLoggedIn() {
        return ResponseEntity.ok(true);
    }
}
