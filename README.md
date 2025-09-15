# AssetFlow: Sistema de Gestión de Activos y Empleados

Este proyecto es una aplicación fullstack para la gestión de activos y empleados.

## Tecnologías principales
- **Backend:** Java 21, Spring Boot 3 (patrón MVC)
- **Frontend:** Next.js, TypeScript, Tailwind CSS, pnpm
- **Contenerización:** Docker, Docker Compose
- **Base de datos:** MySQL 8 (en contenedor)

## Estructura del proyecto
- `/backend`: API REST Spring Boot
  - **Patrón:** MVC (Model-View-Controller)
    - `controller/`: Controladores REST (`ActivoController`, `EmpleadoController`)
    - `service/`: Lógica de negocio (`ActivoService`, `EmpleadoService`)
    - `repository/`: Acceso a datos con Spring Data JPA (`ActivoRepo`, `EmpleadoRepo`)
    - `model/`: Entidades JPA (`Activo`, `Empleado`)
    - `config/`: Configuración adicional de Spring Boot
  - **Comunicación con la base de datos:**
    - Utiliza Spring Data JPA para interactuar con MySQL.
    - La configuración de conexión está en `application.properties` y variables de entorno (`.env`).
    - Las tablas se crean automáticamente al iniciar el backend.
- `/frontend`: Next.js + Tailwind CSS
