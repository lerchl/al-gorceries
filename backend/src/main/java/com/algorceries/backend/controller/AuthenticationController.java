package com.algorceries.backend.controller;

import com.algorceries.backend.dto.RegisterDTO;
import com.algorceries.backend.model.User;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    @CrossOrigin
    public ResponseEntity<Boolean> isLoggedIn() {
        return ResponseEntity.ok(true);
    }

    @PostMapping("/register")
    public User register(RegisterDTO registerDTO) {
        // TODO: Implement
        throw new NotYetImplementedException();
    }
}
