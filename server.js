require('dotenv').config();
const express = require('express');
const clientRoutes = require('./routes/clientRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

// express app
const app = express();

//middleware
app.use(cors({
    origin: '*'
}))
app.use(express.json());

//Routes
app.use('/api/clients', clientRoutes);
app.use('/api/user', userRoutes);

//Connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port ' + process.env.PORT);
        })
    })
    .catch(err => console.log(err.message));


