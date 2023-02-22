package com.algorceries.backend.service;

import java.time.LocalDate;
import java.time.temporal.IsoFields;
import java.util.Collections;
import java.util.stream.Collectors;

import com.algorceries.backend.controller.exception.ConflictException;
import com.algorceries.backend.controller.exception.NotFoundException;
import com.algorceries.backend.model.Dish;
import com.algorceries.backend.model.DishList;
import com.algorceries.backend.model.Season;
import com.algorceries.backend.repository.DishListRepository;
import com.algorceries.backend.repository.DishRepository;
import org.springframework.stereotype.Service;

@Service
public class DishListService {
    
    private static final int DISHES_PER_LIST = 10;

    private final DishListRepository dishListRepository;
    private final DishRepository dishRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishListService(DishListRepository dishListRepository, DishRepository dishRepository) {
        this.dishListRepository = dishListRepository;
        this.dishRepository = dishRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public DishList findByYearAndCalendarWeek(int year, int calendarWeek) {
        return dishListRepository.findByYearAndCalendarWeek(year, calendarWeek)
                .orElseThrow(() -> new NotFoundException("Dish list not found"));
    }

    /**
     * Creates a new {@link DishList dish list} for a week.
     * @param year the year
     * @param calendarWeek the calendar week
     * @return the saved dish list
     * @throws ConflictException if a dish list for the given week already exists
     */
    public DishList create(int year, int calendarWeek) {
        if (dishListRepository.existsByYearAndCalendarWeek(year, calendarWeek)) {
            throw new ConflictException("Dish list for this week already exists");
        }

        var date = LocalDate.now().withYear(year).with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, calendarWeek);
        var dishList = dishRepository.findAll();
        dishList.removeIf(dish -> dishIsOutOfSeason(dish, date));
        Collections.shuffle(dishList);
        var dishSet = dishList.stream().limit(DISHES_PER_LIST).collect(Collectors.toSet());

        return dishListRepository.save(new DishList(year, calendarWeek, dishSet));
    }

    /**
     * Checks if a {@link Dish dish} is out of {@link Season season}.
     * @param dish the dish
     * @param date the date
     * @return {@code true} if the dish is out of season, {@code false} otherwise
     */
    private boolean dishIsOutOfSeason(Dish dish, LocalDate date) {
        var seasons = dish.getSeasons();
        return seasons.stream().anyMatch(season -> dateIsOutOfSeason(date, season));
    }

    /**
     * Checks if a {@link LocalDate date} is out of {@link Season season}.
     * @param date the date
     * @param season the season
     * @return {@code true} if the date is out of season, {@code false} otherwise
     */
    private boolean dateIsOutOfSeason(LocalDate date, Season season) {
        LocalDate begin = LocalDate.of(date.getYear(), season.getBeginMonth(), season.getBeginDay());
        LocalDate end;

        // have to add a year if the season ends in the next year
        if (season.getBeginMonth() > season.getEndMonth()) {
            end = LocalDate.of(date.getYear() + 1, season.getEndMonth(), season.getEndDay());
        } else {
            end = LocalDate.of(date.getYear(), season.getEndMonth(), season.getEndDay());
        }

        return date.isBefore(begin) || date.isAfter(end);
    }
}
