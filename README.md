# AssetFlow: Sistema de Gestión de Activos y Empleados

Este proyecto es una aplicación fullstack profesional para la gestión de activos y empleados, lista para producción y fácil de desplegar con Docker.

## Tecnologías principales
- **Backend:** Java 17, Spring Boot
- **Frontend:** Next.js, TypeScript, Tailwind CSS, pnpm
- **Contenerización:** Docker, Docker Compose

## Ejecución rápida con Docker Compose

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/AssetFlow.git
   cd AssetFlow
   ```
2. **Construye y levanta los servicios:**
   ```bash
   docker-compose up --build
   ```
   Esto levantará el backend en `http://localhost:8080` y el frontend en `http://localhost:3000`.

3. **Accede a la aplicación:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080](http://localhost:8080)

## Estructura del proyecto
- `/backend`: API REST Spring Boot
- `/frontend`: Next.js + Tailwind CSS

## Personalización
- Puedes modificar la variable `NEXT_PUBLIC_API_URL` en el servicio frontend desde `docker-compose.yml` si cambias el puerto del backend.

## Scripts útiles
- Levantar solo backend: `docker-compose up backend`
- Levantar solo frontend: `docker-compose up frontend`


