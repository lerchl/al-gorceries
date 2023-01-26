package com.algorceries.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import com.algorceries.backend.controller.exception.NotFoundException;
import com.algorceries.backend.model.Dish;
import com.algorceries.backend.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * {@link RestController} for {@link Dish Dishes}.
 */
@RestController
@RequestMapping("/dishes")
public class DishController {

    @Autowired
    private DishRepository dishRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping
    public List<Dish> findAll() {
        return dishRepository.findAll();
    }

    @GetMapping("/{id}")
    public Dish findOne(@PathVariable UUID id) {
        var dish = dishRepository.findById(id);

        if (dish.isEmpty()) {
            throw new NotFoundException();
        }

        return dish.get();
    }

    @PostMapping
    public ResponseEntity<Dish> create(@RequestBody Dish dish) {
        dish = dishRepository.save(dish);
        return ResponseEntity.created(URI.create("/dishes/" + dish.getId())).body(dish);
    }

    @PutMapping
    public Dish update(@RequestBody Dish dish) {
        return dishRepository.save(dish);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        dishRepository.deleteById(id);
    }
}
