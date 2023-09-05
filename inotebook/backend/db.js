const mongoose = require('mongoose');

// Replace 'your-database-name' with the name of your database.
const mongoURI = "mongodb+srv://ShubhamManuwas:20csu326@cluster0.sap1arc.mongodb.net/your-database-name";

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
}

module.exports = connectToMongo;
