// components/FormularioActivo.js
import React, { useState } from 'react';
import api from '../api';

const FormularioActivo = ({ onActivoCreated }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        tipo: '',
        valorInicial: 0,
        fechaAdquisicion: '',
        valorActual: 0,
        empleado: { id: '' }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'empleadoId') {
            setFormData(prev => ({ ...prev, empleado: { id: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/activo/crear', formData);
            onActivoCreated && onActivoCreated(response.data);
            setFormData({
                nombre: '',
                tipo: '',
                valorInicial: 0,
                fechaAdquisicion: '',
                valorActual: 0,
                empleado: { id: '' }
            });
        } catch (error) {
            console.error(error);
            alert('Error al crear activo');
        }
    };

    return (
        <div>
            <h2>Crear Activo</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" placeholder="Nombre del Activo" value={formData.nombre} onChange={handleChange} required />
                <input type="text" name="tipo" placeholder="Tipo de Activo" value={formData.tipo} onChange={handleChange} required />
                <input type="number" name="valorInicial" placeholder="Valor Inicial" value={formData.valorInicial} onChange={handleChange} required />
                <input type="date" name="fechaAdquisicion" placeholder="Fecha de Adquisición" value={formData.fechaAdquisicion} onChange={handleChange} required />
                <input type="number" name="valorActual" placeholder="Valor Actual" value={formData.valorActual} onChange={handleChange} required />
                <input type="number" name="empleadoId" placeholder="ID del Empleado" value={formData.empleado.id} onChange={handleChange} required />
                <button type="submit">Crear Activo</button>
            </form>
        </div>
    );
};

export default FormularioActivo;