// App.js
import React from 'react';
import FormularioActivo from './components/FormularioActivo';
import FormularioEmpleado from './components/FormularioEmpleado';
import ListadoActivo from './components/ListadoActivo';
import ListadoEmpleado from './components/ListadoEmpleado';

function App() {
    return (
        <div className="App">
            <h1>Gestión de Activos Empresariales</h1>
            <FormularioEmpleado />
            <ListadoEmpleado />
            <FormularioActivo />
            <ListadoActivo />
        </div>
    );
}

export default App;