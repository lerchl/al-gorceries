package com.algorceries.backend.controller;

import static org.springframework.http.HttpStatus.NO_CONTENT;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.security.UserPrincipal;
import com.algorceries.backend.service.UserService;

/**
 * {@link RestController} for {@link User users}.
 */
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @PostMapping("/household/current/leave")
    @ResponseStatus(NO_CONTENT)
    public void leave(UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();
        userService.leaveHousehold(userPrincipal.getUserId());
    }
}
