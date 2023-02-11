package com.algorceries.backend.controller.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

/**
 * Exception to be thrown when the answer
 * to a request should be 400 Bad Request.
 */
@ResponseStatus(code = BAD_REQUEST)
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}
