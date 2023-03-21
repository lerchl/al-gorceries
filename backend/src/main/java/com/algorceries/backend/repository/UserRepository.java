package com.algorceries.backend.repository;

import java.util.Optional;
import java.util.UUID;

import com.algorceries.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    
    Optional<User> findByEmailAndPassword(String email, String password);
}
