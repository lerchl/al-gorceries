package com.algorceries.backend.controller.exception;

import static org.springframework.http.HttpStatus.FORBIDDEN;

import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception to be thrown when the answer
 * to a request should be 403 Forbidden.
 */
@ResponseStatus(FORBIDDEN)
public class ForbiddenException extends RuntimeException {

    public ForbiddenException() {
        super();
    }
}
