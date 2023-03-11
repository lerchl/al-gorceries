package com.algorceries.backend.service;

import java.security.Key;
import java.util.Date;
import java.util.UUID;

import com.algorceries.backend.model.User;
import com.algorceries.backend.security.UserPrincipal;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import static io.jsonwebtoken.SignatureAlgorithm.HS256;

@Service
public class TokenService {
    
    private static final int EXPIRES_IN = 3600000;
    // TODO: Place into application.properties
    private static final String JWT_SECRET = "not_safe";

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public String generateToken(User user) {
        Date expirationDate = new Date(System.currentTimeMillis() + EXPIRES_IN);
        Key key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes());
        
        String token = Jwts.builder()
                .claim("id", user.getId())
                .claim("sub", user.getEmail())
                .setExpiration(expirationDate)
                .signWith(key, HS256)
                .compact();

        return "Bearer " + token;
    }

    public UserPrincipal parseToken(String token) {
        byte[] secretBytes = JWT_SECRET.getBytes();

        Jws<Claims> jwsClaims = Jwts.parserBuilder()
                .setSigningKey(secretBytes)
                .build()
                .parseClaimsJws(token);

        UUID userId = jwsClaims.getBody().get("id", UUID.class);
        String sub = jwsClaims.getBody().getSubject();

        return new UserPrincipal(userId, sub);
    }
}
