package com.algorceries.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.model.Season;
import com.algorceries.backend.service.SeasonService;

/**
 * {@link RestController} for {@link Season seasons}.
 */
@RestController
@RequestMapping(SeasonController.REQUEST_MAPPING)
public class SeasonController extends HouseholdScopedController<Season> {

    private static final String REQUEST_MAPPING = "/seasons";

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public SeasonController(SeasonService seasonService) {
        super(seasonService, REQUEST_MAPPING);
    }
}
