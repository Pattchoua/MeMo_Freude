require("dotenv/config");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/Mongodb");
const path = require('path');


// Importing routers
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');


// defining the Port
const PORT = process.env.PORT || 5000;

// Using the CORS Middelwares
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// using the parse Middelwares for Json Format and coockies
app.use(express.json());
app.use(cookieParser());

// Mounting the authentication router
app.use("/auth", authRouter);

// Mounting the 'Router' for handling routes 
app.use('/api/posts', postsRouter);

// DEPLOYMENT
{/*if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    const buildPath = path.join(__dirname, '../client/dist');
    app.use(express.static(buildPath));
    app.get('*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}*/}

// database connection and server starting
connectDB().then(() => {
    console.log("Db connected");
    app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));
  });
  gi