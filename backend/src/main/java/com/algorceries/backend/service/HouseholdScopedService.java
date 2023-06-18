package com.algorceries.backend.service;

import java.util.List;
import java.util.UUID;

import com.algorceries.backend.model.HouseholdScopedEntity;
import com.algorceries.backend.model.household.Household;
import com.algorceries.backend.repository.HouseholdScopedRepository;
import com.algorceries.backend.repository.household.HouseholdRepository;
import com.algorceries.backend.service.exception.EmptyOptionalException;
import com.algorceries.backend.service.exception.WrongHouseholdException;

/**
 * Service for {@link Household household}-scoped entities.
 */
public class HouseholdScopedService<T extends HouseholdScopedEntity> {

    private final HouseholdScopedRepository<T> repository;
    private final HouseholdRepository householdRepository;

    private final Class<T> clazz;

    // /////////////////////////////////////////////////////////////////////////
    // Init
    // /////////////////////////////////////////////////////////////////////////

    public HouseholdScopedService(
        HouseholdScopedRepository<T> repository,
        HouseholdRepository householdRepository,
        Class<T> clazz
    ) {
        this.repository = repository;
        this.householdRepository = householdRepository;
        this.clazz = clazz;
    }

    // /////////////////////////////////////////////////////////////////////////
    // Methods
    // /////////////////////////////////////////////////////////////////////////

    /**
     * Find all {@link T t} for a {@link Household household}.
     * @param householdId the id of the household
     * @return a list of ts
     * @throws InvalidArgumentException if householdId is null
     */
    public List<T> findAllByHouseholdId(UUID householdId) {
        return repository.findAllByHouseholdId(householdId);
    }

    /**
     * Find a {@link T t} by its id.
     * @param id the id of the t
     * @param householdId the id of the requesting users's {@link Household household}
     * @return the t
     * @throws EmptyOptionalException if the t could not be found
     * @throws WrongHouseholdException if the requesting user does not belong to
     * the household the t belongs to
     * @throws InvalidArgumentException if id is null
     */
    public T findById(UUID id, UUID householdId) throws EmptyOptionalException, WrongHouseholdException {
        var t = repository.findById(id).orElseThrow(() -> new EmptyOptionalException(clazz));

        if (!t.getHousehold().getId().equals(householdId)) {
            throw new WrongHouseholdException();
        }

        return t;
    }

    /**
     * Create a new {@link T t}.
     * @param t the t to create
     * @param householdId the id of the requesting users's {@link Household household}
     * @return the created t
     * @throws EmptyOptionalException if the household could not be found
     * @throws InvalidArgumentException if householdId is null
     */
    public T create(T t, UUID householdId) throws EmptyOptionalException {
        var household = householdRepository.findById(householdId)
                .orElseThrow(() -> new EmptyOptionalException(Household.class));

        t.setHousehold(household);
        return repository.save(t);
    }

    /**
     * Update a {@link T t}.
     * @param t the t to update
     * @param householdId the id of the requesting users's {@link Household household}
     * @return the updated t
     * @throws EmptyOptionalException if the t or household could not be found
     * @throws WrongHouseholdException if the requesting user does not belong to
     * the household the t belongs to
     * @throws InvalidArgumentException if t's id or householdId is null
     */
    public T update(T t, UUID householdId) throws EmptyOptionalException, WrongHouseholdException {
        var savedT = repository
                .findById(t.getId())
                .orElseThrow(() -> new EmptyOptionalException(clazz));

        var household = householdRepository.findById(householdId)
                .orElseThrow(() -> new EmptyOptionalException(Household.class));

        if (!savedT.getHousehold().equals(household)) {
            throw new WrongHouseholdException();
        }

        t.setHousehold(household);
        return repository.save(t);
    }

    /**
     * Delete an {@link T t} by its id.
     * @param id the id of the t
     * @param householdId the id of the requesting users's {@link Household household}
     * @throws EmptyOptionalException if the t could not be found
     * @throws WrongHouseholdException if the requesting user does not belong to
     * the household the t belongs to
     * @throws InvalidArgumentException if id is null
     */
    public void deleteById(UUID id, UUID householdId) throws EmptyOptionalException, WrongHouseholdException {
        var t = repository.findById(id).orElseThrow(() -> new EmptyOptionalException(clazz));

        if (!t.getHousehold().getId().equals(householdId)) {
            throw new WrongHouseholdException();
        }

        repository.delete(t);
    }
}
