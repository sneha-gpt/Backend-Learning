const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to read from data
app.use(express.urlencoded({ extended: true}));

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Temporary in memory usage
let tasks = [];

/*
========================
ROUTES
========================
*/

// Show form page
app.get("/", (req, res) => {
    res.render("form");
});

// Add new task
app.post("/add-task", (req, res) => {
    const {title, description} = req.body;

    tasks.push({
        title, 
        description
    });

    res.redirect("/tasks");
});

// Show all tasks
app.get("/tasks", (req, res) => {
    res.render("tasks", {tasks});
});

// Delete task
app.post("/delete/:id", (req, res) => {
    const id = req.params.id;

    tasks.splice(id, 1);

    res.redirect("/tasks");
});

// Show edit page
app.get("/edit/:id", (req, res) => {
    const id = req.params.id;

    res.render("edit", {
        task: tasks[id],
        id: id
    });
});

// Update task
app.post("/edit/:id", (req, res) => {
    const id = req.params.id;

    const {title, description} = req.body;

    tasks[id] = {
        title, 
        description
    };

    res.redirect("/tasks");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
