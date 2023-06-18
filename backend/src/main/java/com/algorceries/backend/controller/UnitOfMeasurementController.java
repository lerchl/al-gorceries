package com.algorceries.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.model.UnitOfMeasurement;
import com.algorceries.backend.service.UnitOfMeasurementService;

/**
 * {@link RestController} for {@link UnitOfMeasurement units of measurement}.
 */
@RestController
@RequestMapping(UnitOfMeasurementController.REQUEST_MAPPING)
public class UnitOfMeasurementController extends HouseholdScopedController<UnitOfMeasurement> {

    private static final String REQUEST_MAPPING = "/unitsOfMeasurement";

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public UnitOfMeasurementController(UnitOfMeasurementService service) {
        super(service, REQUEST_MAPPING);
    }
}
