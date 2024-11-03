package com.juanapi.crudemp.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
public class Activo {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false)
    private double valorInicial;

    @Column(nullable = false)
    private LocalDate fechaAdquisicion;

    @Column(nullable = false)
    private double valorActual;

    @ManyToOne
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;

    public void calcDepreciacion(double tasaAnual) {
        long añosDesdeAdq = LocalDate.now().until(fechaAdquisicion).getYears();
        this.valorActual = valorInicial *Math.pow((1 - tasaAnual), añosDesdeAdq);
    }


}
