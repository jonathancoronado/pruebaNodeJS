// src/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');


router.get('/tickets', ticketController.getAllTickets);

router.get('/tickets/filter', ticketController.filterTickets);

router.get('/tickets/:id', ticketController.getTicketById);

router.post('/tickets', ticketController.createTicket);

router.put('/tickets/:id', ticketController.updateTicket);

router.delete('/tickets/:id', ticketController.deleteTicket);



module.exports = router;
