const path = require("path")
const express = require("express")
const app = express()
const PORT = 3000;
app.use(express.static('static'))
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

var users = []
let stan






app.post("/handleLogin", function (req, res) {
    console.log(users)
    console.log(req.body.login)

    console.log(req.body.login.length)
    if (req.body.login.length == 0) {
        req.body.login = "ANONIMOWY"
    }

    if (users.length < 2) {
        if (users[0] == req.body.login) {
            stan = "nazwa gracz już użyta, wybierz inną"
        }
        else {
            users[users.length] = req.body.login
            console.log(users)
            stan = "zalogowano, jest juz 2 graczy"
        }

    } else {
        stan = "juz jest 2 userów"
    }

    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ stan: stan }))
    console.log(stan)
})


app.post("/reset", function (req, res) {
    console.log("resetserver")
    users[0] = ""
    users[1] = ""
    users.length = 0;
    console.log(users)
})


app.post("/ready", function (req, res) {
    console.log(req.body.wait)
    console.log("check")
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ users: users }))
})

app.post("/ruch", function (req, res) {
    console.log(req.body)
    console.log("check")
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ }))
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})