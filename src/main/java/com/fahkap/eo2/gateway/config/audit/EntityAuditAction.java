package com.fahkap.eo2.gateway.config.audit;

/**
 * Enum for the different audit actions
 */
public enum EntityAuditAction {
    CREATE("CREATE"),
    UPDATE("UPDATE"),
    DELETE("DELETE");

    private final String value;

    EntityAuditAction(final String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }

    @Override
    public String toString() {
        return this.value();
    }
}
