require("dotenv/config");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/Mongodb");

// Importing routers
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');


// defining the Port
const PORT = process.env.PORT || 5000;

const path = require('path');


// Using the CORS Middelwares
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// using the parse Middelwares for Json Format and coockies
app.use(express.json());
app.use(cookieParser());

// Mounting the 'Router' for handling routes 
app.use('/api/posts', postsRouter);

// Mounting the authentication router
app.use("/auth", authRouter);


// DEPLOYMENT
if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    const buildPath = path.join(__dirname, '../client/dist');
    app.use(express.static(buildPath));
    app.get('*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

// database connection and server starting
connectDB().then(() => {
    console.log("Db connected");
    app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
});
