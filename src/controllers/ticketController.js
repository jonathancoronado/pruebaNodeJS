// src/controllers/ticketController.js
const Ticket = require('../models/ticket');
const { Op } = require('sequelize');

exports.getAllTickets = async (req, res) => {
  try {
    const { page = 1, pageSize = 5 } = req.query;
    const offset = (page - 1) * pageSize;

    const result = await Ticket.findAndCountAll({
      offset,
      limit: pageSize,
    });

    res.json({
      total: result.count,
      totalPages: Math.ceil(result.count / pageSize),
      currentPage: page,
      tickets: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createTicket = async (req, res) => {
    try {
      const { nombre_ticket, usuario } = req.body;
  
      // Crear el ticket utilizando la instancia del modelo
      const newTicket = await Ticket.create({
        nombre_ticket,
        estado_ticket: 'abierto',
        usuario,
        fecha_creacion: new Date(),
        fecha_edicion: null,
      });
  
      res.status(201).json(newTicket);
    } catch (error) {
      console.error('Error en createTicket:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  exports.updateTicket = async (req, res) => {
    const { id } = req.params;
    const { nombre_ticket, estado_ticket, usuario } = req.body;
  
    try {
      // Validar el valor de estado_ticket
      if (estado_ticket !== 'abierto' && estado_ticket !== 'cerrado') {
        return res.status(400).json({ error: 'Invalid estado_ticket value' });
      }
  
      // Buscar el ticket por ID
      const existingTicket = await Ticket.findByPk(id);
  
      if (existingTicket) {
        // Actualizar el ticket
        await existingTicket.update({
          nombre_ticket,
          estado_ticket,
          usuario,
          fecha_edicion: new Date(),
        });
  
        res.json(existingTicket);
      } else {
        res.status(404).json({ error: 'Ticket not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      await ticket.destroy();
      res.json({ message: 'Ticket deleted successfully' });
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.filterTickets = async (req, res) => {
  console.log("VA A FILTRAR")
  const { usuario, estado_ticket, nombre_ticket } = req.query;
  console.log("USUARIO", usuario);

  const whereClause = {};

  // Validar que al menos un campo esté presente
  if (!usuario && !estado_ticket && !nombre_ticket) {
    return res.status(400).json({ error: 'Debe proporcionar al menos un parámetro para filtrar (usuario, estado o nombre_ticket)' });
  }

  // Filtrar por usuario (LIKE %user%)
  if (usuario) {
    whereClause.usuario = { [Op.like]: `%${usuario}%` };
  }

  // Filtrar por estado_ticket (abierto o cerrado)
  if (estado_ticket && (estado_ticket === 'abierto' || estado_ticket === 'cerrado')) {
    whereClause.estado_ticket = estado_ticket;
  } else if (estado_ticket) {
    return res.status(400).json({ error: 'Parámetro "estado" debe ser "abierto" o "cerrado"' });
  }

  // Filtrar por nombre de ticket (LIKE %nombre_ticket%)
  if (nombre_ticket) {
    whereClause.nombre_ticket = { [Op.like]: `%${nombre_ticket}%` };
  }

  try {
    const tickets = await Ticket.findAll({ where: whereClause });
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
