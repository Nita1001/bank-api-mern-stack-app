const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
        );
    } catch (error) {
        console.error(`Failed to connect to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDb;
