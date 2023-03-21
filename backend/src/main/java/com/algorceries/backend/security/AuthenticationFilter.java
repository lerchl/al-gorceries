package com.algorceries.backend.security;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

import com.algorceries.backend.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class AuthenticationFilter extends OncePerRequestFilter {

    private final TokenService tokenService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public AuthenticationFilter(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        if (request.getCookies() == null) {
            filterChain.doFilter(request, response);
            return;
        }

        Optional<Cookie> tokenCookie = Arrays.stream(request.getCookies()).filter(cookie -> cookie.getName().equals("jwt")).findFirst();

        if (tokenCookie.isEmpty() || tokenCookie.get().getValue() == null) {
            filterChain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken token = createToken(tokenCookie.get().getValue());

        SecurityContextHolder.getContext().setAuthentication(token);
        filterChain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken createToken(String token) {
        UserPrincipal userPrincipal = tokenService.parseToken(token);
        return new UsernamePasswordAuthenticationToken(userPrincipal, null);
    }
}
