package com.algorceries.backend.controller;

import java.net.URI;
import java.util.Collections;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorceries.backend.controller.exception.BadRequestException;
import com.algorceries.backend.model.DishGroup;
import com.algorceries.backend.security.UserPrincipal;
import com.algorceries.backend.service.DishGroupService;
import com.algorceries.backend.service.exception.EmptyOptionalException;
import com.algorceries.backend.service.exception.WrongHouseholdException;

@RestController
@RequestMapping(DishGroupController.REQUEST_MAPPING)
public class DishGroupController extends HouseholdScopedController<DishGroup> {

	protected static final String REQUEST_MAPPING = "/dishGroups";

	private final DishGroupService dishGroupService;

	public DishGroupController(DishGroupService dishGroupService) {
		super(dishGroupService, REQUEST_MAPPING);
		this.dishGroupService = dishGroupService;
	}

	@Override
	public ResponseEntity<DishGroup> create(@RequestBody DishGroup t, UsernamePasswordAuthenticationToken authToken) {
        var userPrincipal = (UserPrincipal) authToken.getPrincipal();

		var dishes = t.getDishes();
		t.setDishes(Collections.emptySet());

		try {
			t = dishGroupService.create(t, userPrincipal.getHouseholdId());
			t.setDishes(dishes);
			t = dishGroupService.update(t, userPrincipal.getHouseholdId());
            return ResponseEntity.created(URI.create(DishGroupController.REQUEST_MAPPING + "/" + t.getId())).body(t);
		} catch (EmptyOptionalException | IllegalArgumentException e) {
            throw new BadRequestException();
		} catch (WrongHouseholdException e) {
			// cannot happen as dish group is only getting created
			return ResponseEntity.internalServerError().build();
		}
	}
}
