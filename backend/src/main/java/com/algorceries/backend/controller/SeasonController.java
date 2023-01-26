package com.algorceries.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import com.algorceries.backend.model.Season;
import com.algorceries.backend.repository.SeasonRepository;
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
 * {@link RestController} for {@link Season seasons}.
 */
@RestController
@RequestMapping("/seasons")
public class SeasonController {

    @Autowired
    private SeasonRepository seasonRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping
    public List<Season> findAll() {
        return seasonRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Season> create(@RequestBody Season season) {
        season = seasonRepository.save(season);
        return ResponseEntity.created(URI.create("/seasons/" + season.getId())).body(season);
    }

    @PutMapping
    public Season update(@RequestBody Season season) {
        return seasonRepository.save(season);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        seasonRepository.deleteById(id);
    }
}
