const express = require('express')
const app = express()

// Middleware
app.use("/", (req, res, next) => {
    console.log("Request received");
        next();
});

// Route 1
app.get("/", (req, res) => {
    res.send("Home page")
});

// Route 2
app.get("/profile", (req, res) => {
    res.send("Profile page")
});

// Server
app.listen(3000)



