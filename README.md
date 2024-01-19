# prueba Jonathan Coronado NodeJS
Esta API proporciona servicios para gestionar tickets. La documentación detallada se encuentra a continuación.

## Requisitos previos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.

## Descarga

Clona el repositorio:
git clone https://github.com/jonathancoronado/pruebaNodeJS

## Instala
Instala las dependencias:
npm install

## Configuracion
Se cargó el archivo .env en el repositorio ya que es un archivo de configuración de base de datos. Esto no es una buena práctica, pero para la prueba técnica se hace.

## Ejecución
node app.js

## Swagger
Se instaló y se configuró Swagger para ejecutarlo desde el navegador y mostrar la información de los servicios. Al ejecutarlo ya podrá visualizar swagger

# Servicios disponibles

## Obtener todos los tickets
GET /api/tickets

## Filtrar tickets
GET /api/tickets/filter?usuario=nombre&estado_ticket=abierto&nombre_ticket=nombre

## Obtener ticket por ID
GET /api/tickets/:id

## Crear un nuevo ticket
POST /api/tickets

Envía una solicitud POST con el cuerpo JSON
{
  "nombre_ticket": "ticket prueba nodeJS",
  "usuario": "Jonathan Coronado"
}

## Actualizar un ticket existente
PUT /api/tickets/:id

Envía una solicitud PUT con el cuerpo JSON
{
  "nombre_ticket": "ticket prueba react native",
  "estado_ticket": "cerrado",
  "usuario": "Jonathan Coronado"
}

## Eliminar un ticket
DELETE /api/tickets/:id

