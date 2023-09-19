
const mongoose = require('mongoose');


// Replace 'your-database-name' with the name of your database.
// const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.sap1arc.mongodb.net/cwhReact`;
const mongoURI = `mongodb+srv://ShubhamManuwas:20csu326@cluster0.sap1arc.mongodb.net/cwhReact`;

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000 
    })
    .then(() => {
        console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
}

module.exports = connectToMongo;
