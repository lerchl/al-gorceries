package com.algorceries.backend.repository;

import java.util.Optional;
import java.util.UUID;

import com.algorceries.backend.model.DishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DishListRepository extends JpaRepository<DishList, UUID> {

    Optional<DishList> findByYearAndCalendarWeek(int year, int calendarWeek);

    boolean existsByYearAndCalendarWeek(int year, int calendarWeek);
}
