package com.juanapi.crudemp.model;


import com.juanapi.crudemp.model.enums.EstadoEmpleado;
import com.juanapi.crudemp.model.enums.TipoContrato;
import com.juanapi.crudemp.model.enums.Departamento;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
public class Empleado {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String telefono;

    @Column(nullable = false)
    private LocalDate fechaContratacion;

    @Column(nullable = false)
    private double salarioBase;

    @Column
    private double horasExtra;

    @Column
    private double deducciones;

    @Column
    private double impuestos;

    @Column
    private double bonificaciones;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Departamento departamento;

    @Column(nullable = false)
    private String cargo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoEmpleado estado;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoContrato tipoContrato;

    @OneToMany(mappedBy = "empleado")
    private List<Activo> activos;

}