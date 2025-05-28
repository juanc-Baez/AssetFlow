// components/FormularioEmpleado.js
import React, { useState } from 'react';
import api from '../api';

const FormularioEmpleado = ({ onEmployeeCreated }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        fechaContratacion: '',
        salarioBase: 0,
        horasExtra: 0,
        deducciones: 0,
        impuestos: 0,
        bonificaciones: 0,
        estado: 'ACTIVO',
        tipoContrato: 'PERMANENTE'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/empleado/crear', formData);
            onEmployeeCreated && onEmployeeCreated(response.data);
            setFormData({
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                fechaContratacion: '',
                salarioBase: 0,
                horasExtra: 0,
                deducciones: 0,
                impuestos: 0,
                bonificaciones: 0,
                estado: 'ACTIVO',
                tipoContrato: 'PERMANENTE'
            });
        } catch (error) {
            console.error(error);
            alert('Error al crear empleado');
        }
    };

    return (
        <div>
            <h2>Crear Empleado</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
                <input type="date" name="fechaContratacion" placeholder="Fecha de contratación" value={formData.fechaContratacion} onChange={handleChange} required />
                <button type="submit">Crear Empleado</button>
            </form>
        </div>
    );
};

export default FormularioEmpleado;