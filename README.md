# MAIA-CAMPUS-EVENT API
Repositorio para alojar el proyecto desarrollado para la asignatura “Desarrollo Web I”, del 1º semestre en la Universidad de Maia (UMAIA).

# Grupo inf25dw1g03
- Ángel Parra García (A048667@umaia.pt)
- Marcos Escribano Latorre (A048754@umaia.pt)
- Marcos Martinez Fernandez (A048665@umaia.pt)

# Descripción del proyecto
Este proyecto tiene como objetivo crear una aplicación web y una API REST que permita a los estudiantes y profesores de la UMAIA:
Consultar y gestionar eventos del campus
Reservar y administrar salas
Registrarse en actividades y talleres

El backend está desarrollado con Node.js (framework Express), y utiliza MySQL como base de datos.
El sistema se ejecuta en un entorno Docker multi-contenedor (MySQL + Node.js).
Todos los endpoints siguen la arquitectura REST, soportan los verbos principales (GET, POST, PUT, DELETE) y devuelven las respuestas en formato JSON.
La API está documentada con OpenAPI 3.0 y se prueba mediante una colección de Postman.

# Estructura del repositorio
- 'src/' : Código fuente del proyecto (API Node.js)
- 'api/' : Documentación OpenAPI 3.0
- 'doc/' : Archivos del informe en Markdown

