package com.algorceries.backend.repository;

import com.algorceries.backend.model.DishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DishListRepository extends JpaRepository<DishList, Long> {

    boolean existsByYearAndCalendarWeek(int year, int calendarWeek);
}
