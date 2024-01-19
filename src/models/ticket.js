// src/models/ticket.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Ticket = sequelize.define('ticket', {
  nombre_ticket: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado_ticket: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_edicion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Ticket;
