package com.algorceries.backend.controller;

import com.algorceries.backend.model.DishList;
import com.algorceries.backend.service.DishListService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/dishLists")
public class DishListController {
    
    private final DishListService dishListService;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public DishListController(DishListService dishListService) {
        this.dishListService = dishListService;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping("/{year}/{calendarWeek}")
    public DishList findByYearAndCalendarWeek(@PathVariable int year, @PathVariable int calendarWeek) {
        return dishListService.findByYearAndCalendarWeek(year, calendarWeek);
    }

    @PostMapping("/{year}/{calendarWeek}")
    @ResponseStatus(CREATED)
    public DishList create(@PathVariable int year, @PathVariable int calendarWeek) {
        return dishListService.create(year, calendarWeek);
    }
}