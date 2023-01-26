package com.algorceries.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import com.algorceries.backend.controller.exception.NotFoundException;
import com.algorceries.backend.model.UnitOfMeasurement;
import com.algorceries.backend.repository.UnitOfMeasurementRepository;
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
 * {@link RestController} for {@link UnitOfMeasurement units of measurement}.
 */
@RestController
@RequestMapping("/unitsOfMeasurement")
public class UnitOfMeasurementController {

    @Autowired
    private UnitOfMeasurementRepository unitOfMeasurementRepository;

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    @GetMapping
    public List<UnitOfMeasurement> findAll() {
        return unitOfMeasurementRepository.findAll();
    }

    @GetMapping("/{id}")
    public UnitOfMeasurement findOne(@PathVariable UUID id) {
        var unitOfMeasurement = unitOfMeasurementRepository.findById(id);

        if (unitOfMeasurement.isEmpty()) {
            throw new NotFoundException();
        }

        return unitOfMeasurement.get();
    }

    @PostMapping
    public ResponseEntity<UnitOfMeasurement> create(@RequestBody UnitOfMeasurement unitOfMeasurement) {
        unitOfMeasurement = unitOfMeasurementRepository.save(unitOfMeasurement);
        return ResponseEntity.created(URI.create("/unitsOfMeasurement/" + unitOfMeasurement.getId())).body(unitOfMeasurement);
    }

    @PutMapping
    public UnitOfMeasurement update(@RequestBody UnitOfMeasurement unitOfMeasurement) {
        return unitOfMeasurementRepository.save(unitOfMeasurement);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        unitOfMeasurementRepository.deleteById(id);
    }
}
