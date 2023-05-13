package com.algorceries.backend.repository;

import java.util.UUID;

import com.algorceries.backend.model.DishListDish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@link JpaRepository} for {@link DishListDish dish list dishes}.
 */
@Repository
public interface DishListDishRepository extends JpaRepository<DishListDish, UUID> {

    // @Modifying
    // @Query("UPDATE DishListDish dld SET dld.selected = :selected WHERE dld.id = :id")
    // void updateSelectedById(@Param("selected") boolean selected, @Param("id") UUID id);
}
