package com.afrifood.app.dto;

import com.afrifood.app.entity.Role;

public class UpdateUserRoleRequest {
    private Role role;

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
