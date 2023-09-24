const connectToMongo = require('./db');
var cors=require('cors');

connectToMongo();
const express = require('express');
const app = express();
const port = 4000;

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


// Route for handling GET requests
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
