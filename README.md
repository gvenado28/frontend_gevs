# Administrador de Tareas - Captura de PET (Frontend)

Este proyecto de frontend es la interfaz de usuario para una aplicación de **Administración de Tareas y Captura de PET**, diseñada para facilitar la gestión de la captura de PET en tiempo real y la visualización de reportes, con funcionalidades de gestión de usuarios, tareas y captura semanal de PET.

## Índice

- [Características](#características)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Funcionalidades](#funcionalidades)
- [Documentación de API](#documentación-de-api)
- [Contribuciones](#contribuciones)

## Características

- Registro y autenticación de usuarios (administradores y operadores).
- Registro semanal de la cantidad de PET recolectado por operadores.
- Cálculo automático del valor de PET en USD y MXN.
- Visualización de reportes de captura de PET.
- Administración de usuarios por parte de un administrador.
- Interfaz de usuario intuitiva y fácil de usar.

## Tecnologías Usadas

- **Frontend**: React
- **Ruteo**: React Router DOM
- **Autenticación**: JWT (JSON Web Token) almacenado en `localStorage`.
- **Estilos**: CSS puro, estructura modular de estilos en cada componente.
- **Backend** (proyecto asociado): Node.js con Express (ver el repositorio [backend](https://github.com/GabrielGM16/back_global_aw)).

## Requisitos

- **Node.js** y **npm** instalados
- Backend en funcionamiento en el puerto `5000` o según se haya configurado

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/GabrielGM16/front_global_aw.git
   cd front_global_aw
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno necesarias en el archivo `.env` (en el frontend puede no ser necesario, pero asegúrate de que el backend esté configurado correctamente).

4. Ejecuta el proyecto:

   ```bash
   npm start
   ```

5. Accede a la aplicación en `http://localhost:3000`.

## Estructura del Proyecto

```plaintext
├── src
│   ├── components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Home.js
│   │   ├── Dashboard.js
│   │   ├── CreateTask.js
│   │   ├── TaskList.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── PETCapture.js
│   │   ├── PETReport.js
│   ├── styles
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── Footer.css
│   │   ├── Home.css
│   │   └── ...
│   ├── App.js
│   ├── index.js
└── README.md
```

- **components/**: Contiene todos los componentes reutilizables de la interfaz.
- **styles/**: Contiene los archivos CSS de cada componente, manteniendo la estructura modular.
- **App.js**: Punto principal de la aplicación, maneja las rutas y el estado de autenticación.
- **index.js**: Punto de entrada del proyecto.

## Scripts Disponibles

### `npm start`

Inicia la aplicación en modo de desarrollo. Normalmente se ejecuta en `http://localhost:3000`.

### `npm run build`

Compila la aplicación para producción en la carpeta `build`, optimizándola para el mejor rendimiento.

## Funcionalidades

### 1. Autenticación de Usuarios
   - **Login**: Los usuarios pueden iniciar sesión y autenticarse usando JWT. Los tokens se almacenan en `localStorage` y son utilizados para acceder a las rutas protegidas.
   - **Registro**: Los nuevos usuarios pueden registrarse en la aplicación.

### 2. Registro de Captura de PET
   - Los operadores pueden capturar semanalmente el PET recolectado.
   - Se calcula el valor del PET automáticamente en USD y MXN según el peso ingresado.
   - Los datos se registran para ser consultados posteriormente en los reportes.

### 3. Visualización de Reportes de PET
   - Los usuarios pueden ver un historial de capturas anteriores en formato de tabla.
   - Incluye información sobre la fecha de captura, el peso en kg, y los valores en USD y MXN.

### 4. Gestión de Tareas
   - Se permite a los usuarios agregar, visualizar y completar tareas relacionadas con la recolección de PET.

### 5. Roles de Usuario
   - **Administrador**: Puede gestionar usuarios y ver reportes completos.
   - **Operador**: Limitado a la funcionalidad de captura y visualización de reportes de PET.

## Documentación de API

La aplicación consume las siguientes rutas de la API backend (configuradas para el puerto `5000`):

- **POST `/api/auth/register`**: Registra un nuevo usuario.
- **POST `/api/auth/login`**: Autentica a un usuario y devuelve un token JWT.
- **POST `/api/pet/pet-capture`**: Registra una nueva captura de PET.
- **GET `/api/pet/pet-report`**: Obtiene el reporte de capturas de PET.

> Para detalles de implementación y código, consulta el repositorio backend asociado.

## Contribuciones

Para contribuir, sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y realiza commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

## Licencia

Este proyecto es de código abierto y se distribuye bajo la licencia MIT.

