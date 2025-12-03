MAIA-CAMPUS-EVENT API
Repositorio para alojar el proyecto desarrollado para la asignatura “Desarrollo Web I”, del 1º semestre en la Universidad de Maia (UMAIA).

Grupo inf25dw1g03
Ángel Parra García (A048667@umaia.pt)
Marcos Escribano Latorre (A048754@umaia.pt)
Marcos Martinez Fernandez (A048665@umaia.pt)
Descripción del proyecto
Este proyecto implementa una API REST para la gestión de eventos del Campus UMAIA.
Permite registrar y administrar usuarios, salas, eventos, etiquetas y reservas.

El backend está desarrollado con Node.js (framework Express) y utiliza MySQL como sistema gestor de base de datos.

La API incluye:

Documentación completa en formato OpenAPI 3.0 (archivo openapi.yaml)
Generación automática de controladores a partir del contrato OpenAPI
Base de datos inicializada mediante script SQL (init.sql)
Ejecución mediante Docker (contenedores: API + MySQL)
Interfaz de Swagger UI disponible en http://localhost:8080/api-docs
Tecnologías utilizadas
Node.js
Express.js
MySQL 8.0
Docker & Docker Compose
OpenAPI 3.0
Swagger UI
JavaScript
Ejecución con Docker
Clonar el repositorio
Ejecutar:
docker-compose up --build

Acceder a:
API: http://localhost:8080
Swagger UI: http://localhost:8080/api-docs
Ejecución sin Docker
Crear base de datos en MySQL: CREATE DATABASE maia_campus_event;

Importar el script: mysql -u root -p maia_campus_event < database/init.sql

Instalar dependencias: cd express-server npm install

Ejecutar servidor: npm start

Estructura del repositorio
/express-server → Código fuente del servidor (Node.js) /express-server/api → Controladores y rutas generadas por OpenAPI /express-server/services → Lógica de negocio /express-server/utils/db.js → Conexión MySQL /database/init.sql → Script SQL para crear tablas e insertar datos openapi.yaml → Documentación de la API (OpenAPI 3.0) docker-compose.yml → Contenedores: MySQL + API Dockerfile → Imagen del servidor Node.js
