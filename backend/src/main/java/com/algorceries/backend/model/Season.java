package com.algorceries.backend.model;

import java.util.UUID;

import com.algorceries.backend.model.household.Household;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

/**
 * {@link HouseholdScopedEntity} representing a season.
 */
@Entity(name = "algo_season")
public class Season implements HouseholdScopedEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "begin_day")
    private int beginDay;

    @Column(name = "begin_month")
    private int beginMonth;

    @Column(name = "end_day")
    private int endDay;

    @Column(name = "end_month")
    private int endMonth;

    @ManyToOne
    @JoinColumn(name = "household_id")
    @JsonIgnore
    private Household household;

    // /////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    // /////////////////////////////////////////////////////////////////////////

    @Override
    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getBeginDay() {
        return beginDay;
    }

    public void setBeginDay(int beginDay) {
        this.beginDay = beginDay;
    }

    public int getBeginMonth() {
        return beginMonth;
    }

    public void setBeginMonth(int beginMonth) {
        this.beginMonth = beginMonth;
    }

    public int getEndDay() {
        return endDay;
    }

    public void setEndDay(int endDay) {
        this.endDay = endDay;
    }

    public int getEndMonth() {
        return endMonth;
    }

    public void setEndMonth(int endMonth) {
        this.endMonth = endMonth;
    }

    @Override
    public Household getHousehold() {
        return household;
    }

    @Override
    public void setHousehold(Household household) {
        this.household = household;
    }
}
