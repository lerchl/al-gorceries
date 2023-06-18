package com.algorceries.backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.algorceries.backend.model.DishList;

public interface DishListRepository extends JpaRepository<DishList, UUID> {

    Optional<DishList> findByYearAndCalendarWeekAndHouseholdId(int year,
                                                               int calendarWeek,
                                                               UUID householdId);
    boolean existsByYearAndCalendarWeekAndHouseholdId(int year,
                                                      int calendarWeek,
                                                      UUID householdId);
}
