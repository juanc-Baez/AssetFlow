package com.juanapi.crudemp.service;


import com.juanapi.crudemp.model.Activo;
import com.juanapi.crudemp.model.Empleado;
import com.juanapi.crudemp.repository.ActivoRepo;
import com.juanapi.crudemp.repository.EmpleadoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivoService {

    @Autowired
    private ActivoRepo activoRepo;
    @Autowired
    private EmpleadoRepo empleadoRepo;

    public Activo crearActivo(Activo activo) {
        return activoRepo.save(activo);
    }

    public List<Activo> obtActivos() {
        return activoRepo.findAll();
    }

    public Optional<Activo> asignarActivo(Long activoId, Long empleadoId) {
        Optional<Activo> activoOpt = activoRepo.findById(activoId);
        Optional<Empleado> empleadoOpt = empleadoRepo.findById(empleadoId);

        if (activoOpt.isPresent() && empleadoOpt.isPresent()) {
            Activo activo = activoOpt.get();
            Empleado empleado = empleadoOpt.get();
            activo.setEmpleado(empleado);
            return Optional.of(activoRepo.save(activo));
        }
        return Optional.empty();
    }

    public void actualizarActivo(Long id, Activo cambios) {
        Optional<Activo> activoOpt = activoRepo.findById(id);
        if (activoOpt.isPresent()) {
            Activo activo = activoOpt.get();
            activo.setTipo(cambios.getTipo());
            activo.setNombre(cambios.getNombre());
            activo.setFechaAdquisicion(cambios.getFechaAdquisicion());
            activo.setValorInicial(cambios.getValorInicial());
            activo.setValorActual(cambios.getValorActual());
            activoRepo.save(activo);

        }
    }


    public void eliminarActivo(Long id) {
        activoRepo.deleteById(id);
    }
}
