// components/ListadoActivo.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const ListadoActivo = () => {
    const [activos, setActivos] = useState([]);

    const fetchActivos = async () => {
        try {
            const response = await api.get('/activo/obtActivos');
            setActivos(response.data);
        } catch (error) {
            console.error(error);
            alert('Error al obtener activos');
        }
    };

    useEffect(() => {
        fetchActivos();
    }, []);

    return (
        <div>
            <h2>Lista de Activos</h2>
            <ul>
                {activos.map(activo => (
                    <li key={activo.id}>
                        {activo.nombre} - {activo.tipo} (${activo.valorActual})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListadoActivo;