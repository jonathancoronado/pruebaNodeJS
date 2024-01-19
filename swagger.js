// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Ticket API',
      version: '1.0.0',
      description: 'API for managing tickets',
    },
  },
  apis: [path.resolve(__dirname, 'src', 'routes', '*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
