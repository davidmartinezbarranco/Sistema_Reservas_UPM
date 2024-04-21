package com.sira.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BaseSchedule {
    private static final int INITIAL_HOUR = 9;
    private static final int FINAL_HOUR = 20;
    private static final int NUM_HOURS = FINAL_HOUR - INITIAL_HOUR + 1; // Total number of hours

    private boolean[] availableHours;

    public BaseSchedule(){
        this.availableHours = new boolean[NUM_HOURS]; // Initialize boolean array
        // All hours are initially available
        Arrays.fill(availableHours, true);
    }

    // Method to mark an hour as occupied
    public void markOccupied(int hour) {
        if (hour >= INITIAL_HOUR && hour <= FINAL_HOUR) {
            availableHours[hour - INITIAL_HOUR] = false;
        } else {
            throw new IllegalArgumentException("Hour out of allowed range");
        }
    }

    // Method to mark an hour as available
    public void markAvailable(int hour) {
        if (hour >= INITIAL_HOUR && hour <= FINAL_HOUR) {
            availableHours[hour - INITIAL_HOUR] = true;
        } else {
            throw new IllegalArgumentException("Hour out of allowed range");
        }
    }

    // Method to check if an hour is available
    public boolean isHourAvailable(int hour) {
        if (hour >= INITIAL_HOUR && hour <= FINAL_HOUR) {
            return availableHours[hour - INITIAL_HOUR];
        } else {
            throw new IllegalArgumentException("Hour out of allowed range");
        }
    }

    // Method to get all available hours
    public List<Integer> getAvailableHours() {
        List<Integer> availableHoursList = new ArrayList<>();
        for (int i = 0; i < NUM_HOURS; i++) {
            if (availableHours[i]) {
                availableHoursList.add(i + INITIAL_HOUR);
            }
        }
        return availableHoursList;
    }
}
