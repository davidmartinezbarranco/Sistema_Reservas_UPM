package com.sira.util;

import java.util.Arrays;
import java.util.List;

public enum Role {
    STUDENT(Arrays.asList(Permission.READ_USER_BY_ID, Permission.MODIFY_USER_BY_ID, Permission.DELETE_USER_BY_ID)),
    PROFESSOR(Arrays.asList(Permission.READ_USER_BY_ID, Permission.MODIFY_USER_BY_ID, Permission.DELETE_USER_BY_ID)),
    ADMINISTRATOR(Arrays.asList(Permission.READ_USER_BY_ID, Permission.MODIFY_USER_BY_ID, Permission.DELETE_USER_BY_ID));

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
