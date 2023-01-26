package com.algorceries.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import com.algorceries.backend.controller.exception.NotFoundException;
import com.algorceries.backend.model.Ingredient;
import com.algorceries.backend.repository.IngredientRepository;
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
 * {@link RestController} for {@link Ingredient Ingredients}.
 */
@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping
    public List<Ingredient> findAll() {
        return ingredientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Ingredient findOne(@PathVariable UUID id) {
        var ingredient = ingredientRepository.findById(id);

        if (ingredient.isEmpty()) {
            throw new NotFoundException();
        }

        return ingredient.get();
    }

    @PostMapping
    public ResponseEntity<Ingredient> create(@RequestBody Ingredient ingredient) {
        ingredient = ingredientRepository.save(ingredient);
        return ResponseEntity.created(URI.create("/ingredients/" + ingredient.getId())).body(ingredient);
    }

    @PutMapping
    public Ingredient update(@RequestBody Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        ingredientRepository.deleteById(id);
    }
}
