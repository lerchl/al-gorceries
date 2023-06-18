package com.algorceries.backend.service;

import java.time.LocalDate;
import java.time.temporal.IsoFields;
import java.util.Collections;
import java.util.HashSet;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.algorceries.backend.model.Dish;
import com.algorceries.backend.model.DishList;
import com.algorceries.backend.model.DishListDish;
import com.algorceries.backend.model.Season;
import com.algorceries.backend.model.household.Household;
import com.algorceries.backend.repository.DishListDishRepository;
import com.algorceries.backend.repository.DishListRepository;
import com.algorceries.backend.repository.DishRepository;
import com.algorceries.backend.repository.household.HouseholdRepository;
import com.algorceries.backend.service.exception.DuplicateDishListException;
import com.algorceries.backend.service.exception.EmptyOptionalException;
import com.algorceries.backend.service.exception.NoHouseholdException;

/**
 * Service for {@link DishList dish lists}.
 */
@Service
public class DishListService {

    private static final int DISHES_PER_LIST = 10;

    private final DishListRepository dishListRepository;
    private final DishRepository dishRepository;
    private final DishListDishRepository dishListDishRepository;
    private final HouseholdRepository householdRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishListService(DishListRepository dishListRepository,
                           DishRepository dishRepository,
                           DishListDishRepository dishListDishRepository,
                           HouseholdRepository householdRepository) {
        this.dishListRepository = dishListRepository;
        this.dishRepository = dishRepository;
        this.dishListDishRepository = dishListDishRepository;
        this.householdRepository = householdRepository;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    public DishList findByYearAndCalendarWeekAndHouseholdId(int year,
                                                            int calendarWeek,
                                                            UUID householdId) throws EmptyOptionalException {
        return dishListRepository.findByYearAndCalendarWeekAndHouseholdId(year, calendarWeek, householdId)
                                 .orElseThrow(() -> new EmptyOptionalException(DishList.class));
    }

    /**
     * Creates a new {@link DishList dish list} for a week.
     * @param year the year
     * @param calendarWeek the calendar week
     * @param householdId the id of the requesting user's {@link Household household}
     * @return the saved dish list
     * @throws DuplicateDishListException if a dish list for the given week already exists
     * @throws EmptyOptionalException if the {@link Household household} could not be found
     * @throws NoHouseholdException if householdId is null
     */
    public DishList create(int year, int calendarWeek, UUID householdId)
            throws DuplicateDishListException, EmptyOptionalException, NoHouseholdException {
        if (householdId == null) {
            throw new NoHouseholdException();
        }

        if (dishListRepository.existsByYearAndCalendarWeekAndHouseholdId(year, calendarWeek, householdId)) {
            throw new DuplicateDishListException();
        }

        var household = householdRepository.findById(householdId)
                                           .orElseThrow(() -> new EmptyOptionalException(Household.class));
        // TODO: Would be nice if the dish list could be created
        // with the dishes already and then everything saved at once.
        var dishList = dishListRepository.save(new DishList(year, calendarWeek, household));
        var date = LocalDate.now().withYear(year).with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, calendarWeek);
        var allDishes = dishRepository.findAll();
        allDishes.removeIf(dish -> dishIsOutOfSeason(dish, date));
        Collections.shuffle(allDishes);
        var dishListDishes = allDishes.stream()
                .limit(DISHES_PER_LIST)
                .map(dish -> dishListDishRepository.save(new DishListDish(dish, dishList)))
                .toList();

        dishList.setDishListDishes(new HashSet<>(dishListDishes));
        return dishListRepository.save(dishList);
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
