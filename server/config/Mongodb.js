const mongoose = require ('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('MongoDB connected sucessfully!');
    } catch (error) {
        console.log("🚀 ~ file: Mongodb.js:11 ~ connectDB ~ error:", error)
        process.exit(1)
    }
};
module.exports = connectDB;