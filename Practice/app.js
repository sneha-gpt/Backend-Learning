const express = require('express')

const PORT = 3000
const app = express()

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render('home')
})

app.get("/about", (req, res) => {
    res.render('about')
})

app.get("/login", (req, res) => {
    res.render('login')
})

app.listen(`${PORT}`, () => {
    console.log(`Server running on port ${PORT}`)
});
