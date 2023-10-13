const Client = require('../models/clientModel');
const mongoose = require('mongoose');

// Get all clients
const getClients = async (req, res) => {
    const user_id = req.user._id;
    const clients = await Client.find({ user_id, archived: false}).sort({createdAt: 1});
    
    res.status(200).json(clients);
}

// Get single client details
const getClientDetails = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'No client with requested id was found.'});
    }

    const client = await Client.findById(id)
    
    if(!client) {
        return res.status(404).json({message: 'No client with requested id was found.'});
    }

    res.status(200).json(client);
}

// Add a new client
const addClient = async (req, res) => {
    const { name, contact, address, description, bid, emergency, contract, archived, geolocation } = req.body;

    // add client to database
    try{
        const user_id = req.user._id;
        const client = await Client.create({ name, contact, address, description, bid, emergency, contract, user_id, archived, geolocation });
        res.status(200).json(client);
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }

}


// Edit an existing client
const editClient = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'No client with requested id was found.'});
    }

    const client = await Client.findOneAndUpdate({_id: id}, {...req.body})

    if(!client) {
        return res.status(404).json({message: 'No client with requested id was found.'});
    }

    res.status(200).json(client);
}

// Delete a client
const deleteClient = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'No client with requested id was found.'});
    }

    const client = await Client.findOneAndDelete({_id: id})

    if(!client) {
        return res.status(404).json({message: 'No client with requested id was found.'});
    }

    res.status(200).json(client);
}

// Get Archive Client List
const getArchivedClients = async (req, res) => {
    const user_id = req.user._id;
    const clients = await Client.find({ user_id, archived: true }).sort({createdAt: 1});

    res.status(200).json(clients);
}


module.exports = {
    getClients,
    addClient,
    getClientDetails,
    editClient,
    deleteClient,
    getArchivedClients
}