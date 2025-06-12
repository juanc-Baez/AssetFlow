package com.juanapi.crudemp;

import com.juanapi.crudemp.model.Empleado;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class EmpleadoUnitTest {
    @Test
    void testEmpleadoSetAndGetNombre() {
        Empleado empleado = new Empleado();
        empleado.setNombre("Juan");
        Assertions.assertEquals("Juan", empleado.getNombre());
    }
}
