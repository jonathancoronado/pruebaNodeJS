// app.js
const express = require('express');
const bodyParser = require('body-parser');
const ticketRoutes = require('./src/routes/ticketRoutes');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./src/routes/ticketRoutes');
const db = require('./src/models/index');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', ticketRoutes);

// Sincronizar Sequelize con la base de datos
db.sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
