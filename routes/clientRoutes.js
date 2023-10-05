const express = require('express');
const { 
    getClients,
    addClient,
    getClientDetails,
    editClient,
    deleteClient,
    getArchivedClients
} = require('../controllers/clientControllers')
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//middleware require auth for all client routes
router.use(requireAuth);

// Get list of Clients
router.get('/', getClients);

//Get Archived Clients
router.get('/archive', getArchivedClients);

//Get single clients details
router.get('/:id', getClientDetails);

//Add new client
router.post('/', addClient);

//Edit existing client
router.patch('/:id', editClient);

//Delete exisiting client
router.delete('/:id', deleteClient);


module.exports = router;