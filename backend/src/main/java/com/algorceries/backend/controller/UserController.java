package com.algorceries.backend.controller;

import static org.springframework.http.HttpStatus.NO_CONTENT;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.security.UserPrincipal;
import com.algorceries.backend.service.UserHouseholdService;

/**
 * {@link RestController} for {@link User users}.
 */
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserHouseholdService userHouseholdService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public UserController(UserHouseholdService userHouseholdService) {
        this.userHouseholdService = userHouseholdService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @PostMapping("/household/current/leave")
    @ResponseStatus(NO_CONTENT)
    public void leave(UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

        try {
            userHouseholdService.leaveHousehold(userPrincipal.getUserId());
        } catch (IllegalArgumentException | IllegalStateException e) {
            throw new BadRequestException(e.getMessage());
        }
    }
}
