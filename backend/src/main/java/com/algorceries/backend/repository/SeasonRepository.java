package com.algorceries.backend.repository;

import java.util.UUID;

import com.algorceries.backend.model.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@link JpaRepository} for {@link Season seasons}.
 */
@Repository
public interface SeasonRepository extends JpaRepository<Season, UUID> {
    // noop
}
