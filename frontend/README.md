# Frontend – Sistema de Gestión de Activos y Empleados

Este frontend fue generado con ayuda de inteligencia artificial y su objetivo principal es mostrar y probar la funcionalidad del backend de forma visual y sencilla. No representa el foco principal del desarrollo, pero sigue buenas prácticas y una estructura profesional.

## Tecnologías utilizadas
- **Next.js** (React framework para SSR y SSG)
- **TypeScript** (tipado estático)
- **Tailwind CSS** (estilos utilitarios y diseño responsivo)
- **pnpm** o **npm** (gestor de paquetes, usa solo uno a la vez)

## Instalación y ejecución local

1. Instala las dependencias:
   ```bash
   pnpm install
   # o npm install
   ```
2. Asegúrate de que la variable de entorno `NEXT_PUBLIC_API_URL` esté definida en el archivo `.env` en la raíz del proyecto (no es necesario `.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
3. Ejecuta la aplicación en modo desarrollo:
   ```bash
   pnpm dev
   # o npm run dev
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Ejecución con Docker

Desde la raíz del proyecto, puedes levantar el frontend (y el backend) usando Docker Compose:
```bash
docker-compose up --build
```
Esto expondrá el frontend en [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto
- `/components`: Componentes reutilizables de la UI y formularios.
- `/app`: Rutas principales de la aplicación (Next.js App Router).
- `/lib`: Utilidades y funciones para consumir la API.
- `/public`: Recursos estáticos (imágenes, íconos, etc).
- `/styles`: Archivos de estilos globales.
- `/hooks`: Custom hooks de React.

## Detalles relevantes para desarrolladores
- El frontend consume la API REST del backend mediante la variable de entorno `NEXT_PUBLIC_API_URL` definida en `.env` (no uses `.env.local`).
- El diseño es responsivo y utiliza Tailwind para facilitar la personalización.
- Los formularios y listados están pensados para probar todas las operaciones CRUD del backend.
- Estructura modular y fácil de extender.
- No subas archivos `.env` reales a git, usa `.env.example` para compartir la estructura de variables.

## Pruebas
Próximamente: integración de pruebas unitarias con Jest y React Testing Library.

## Autor
Juan Baez

---
Este frontend es parte de un sistema fullstack para portafolio. Contacto: juanbaezc8@gmail.com
