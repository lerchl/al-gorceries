package com.algorceries.backend.service;

import static io.jsonwebtoken.SignatureAlgorithm.HS256;

import java.security.Key;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.User;
import com.algorceries.backend.security.UserPrincipal;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Service
public class TokenService {

    /**
     * 1 hour
     */
    private static final int EXPIRES_IN = 3600000;

    private static final SecretKey JWT_SECRET = Keys.secretKeyFor(HS256);

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public String generateToken(User user) {
        Date expirationDate = new Date(System.currentTimeMillis() + EXPIRES_IN);
        Key key = Keys.hmacShaKeyFor(JWT_SECRET.getEncoded());

        return Jwts.builder()
                .claim("id", user.getId())
                .claim("sub", user.getEmail())
                .claim("admin", user.isAdmin())
                .setExpiration(expirationDate)
                .signWith(key, HS256)
                .compact();
    }

    public Optional<UserPrincipal> parseToken(String token) {
        Jws<Claims> jwsClaims;

        try {
            jwsClaims = Jwts.parserBuilder()
                    .setSigningKey(JWT_SECRET.getEncoded())
                    .build()
                    .parseClaimsJws(token);
        } catch (SignatureException e) {
            return Optional.empty();
        }

        UUID userId = UUID.fromString(jwsClaims.getBody().get("id", String.class));
        String sub = jwsClaims.getBody().getSubject();
        boolean admin = jwsClaims.getBody().get("admin", Boolean.class);

        return Optional.of(new UserPrincipal(userId, sub, admin));
    }
}
