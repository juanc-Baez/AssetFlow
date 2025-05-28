package com.juanapi.crudemp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.juanapi.crudemp.model.Activo;
import com.juanapi.crudemp.service.ActivoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/activo")
@CrossOrigin(origins = "*")
public class ActivoController {

    @Autowired
    private ActivoService activoService;

    @GetMapping("/obtActivos")
    public ResponseEntity<List<Activo>> obtActivos() {
        return ResponseEntity.ok(activoService.obtActivos());
    }


    @PostMapping(value = "/crear")
    public ResponseEntity<Activo> crearActivo(@RequestBody Activo activo) {
        return ResponseEntity.ok(activoService.crearActivo(activo));
    }

    @PutMapping("/asignar/{activoId}/{empleadoId}")
    public ResponseEntity<Activo> asignarActivo(@PathVariable Long activoId, @PathVariable Long empleadoId) {
        Optional<Activo> activoOpt = activoService.asignarActivo(activoId, empleadoId);
        return activoOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PutMapping("actualizar/{id}")
    public ResponseEntity<Activo> actualizarActivo(@PathVariable Long id, @RequestBody Activo activo) {
        activoService.actualizarActivo(id, activo);
        return ResponseEntity.ok(activo);
    }

    @DeleteMapping("eliminar/{id}")
    public ResponseEntity<Activo> eliminarActivo(@PathVariable Long id) {
        activoService.eliminarActivo(id);
        return ResponseEntity.ok().build();
    }

}
