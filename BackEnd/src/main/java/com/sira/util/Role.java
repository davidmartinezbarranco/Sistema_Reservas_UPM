package com.sira.util;

import java.util.Arrays;
import java.util.List;

public enum Role {
    //TODO Aqui irán los permisos que tengan asignados cada rol
    STUDENT(Arrays.asList(Permission.CREATE_ONE_RESERVATION, Permission.READ_ALL_RESERVATIONS)),
    PROFESSOR(Arrays.asList(Permission.CREATE_ONE_RESERVATION, Permission.READ_ALL_RESERVATIONS, Permission.SAVE_ONE_ROOM)),
    ADMINISTRATOR(Arrays.asList(Permission.CREATE_ONE_RESERVATION, Permission.READ_ALL_RESERVATIONS, Permission.SAVE_ONE_ROOM, Permission.READ_ALL_USERS));

    private List<Permission> permissions;

    Role(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }
}
