package com.algorceries.backend.it;

import com.algorceries.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserRepositoryIT {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindAll() {
        var users = userRepository.findAll();
        System.out.println(users);
    }
}
