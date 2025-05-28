// components/ListadoEmpleado.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const ListadoEmpleado = () => {
    const [empleados, setEmpleados] = useState([]);

    const fetchEmpleados = async () => {
        try {
            const response = await api.get('/empleado/obtEmpleados');
            setEmpleados(response.data);
        } catch (error) {
            console.error(error);
            alert('Error al obtener empleados');
        }
    };

    useEffect(() => {
        fetchEmpleados();
    }, []);

    return (
        <div>
            <h2>Lista de Empleados</h2>
            <ul>
                {empleados.map(empleado => (
                    <li key={empleado.id}>
                        {empleado.nombre} {empleado.apellido} - {empleado.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListadoEmpleado;