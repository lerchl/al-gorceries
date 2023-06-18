package com.algorceries.backend.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.algorceries.backend.service.TokenService;
import com.algorceries.backend.service.household.HouseholdService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenticationFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final HouseholdService householdService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public AuthenticationFilter(TokenService tokenService, HouseholdService householdService) {
        this.tokenService = tokenService;
        this.householdService = householdService;
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

        Optional<UsernamePasswordAuthenticationToken> optionalToken = createToken(tokenCookie.get().getValue());

        if (optionalToken.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        var token = optionalToken.get();
        var userPrincipal = (UserPrincipal) token.getPrincipal();
        var household = householdService.findByUserId(userPrincipal.getUserId());

        if (household.isEmpty()) {
            userPrincipal.setHouseholdId(null);
        } else {
            userPrincipal.setHouseholdId(household.get().getId());
        }

        SecurityContextHolder.getContext().setAuthentication(token);
        filterChain.doFilter(request, response);
    }

    private Optional<UsernamePasswordAuthenticationToken> createToken(String token) {
        Optional<UserPrincipal> userPrincipal = tokenService.parseToken(token);

        if (userPrincipal.isEmpty()) {
            return Optional.empty();
        }

        List<GrantedAuthority> authorities = new ArrayList<>();

        if (userPrincipal.get().isAdmin()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }

        return Optional.of(new UsernamePasswordAuthenticationToken(userPrincipal.get(), null, authorities));
    }
}
