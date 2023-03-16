console.log("net")
var logged = true
var color = "none";
var gamestarted = false
var user

class Net {

    constructor() {

        setInterval(async function () {
            if (logged) {
                let users = await net.ready()
                console.log(users,":",users.users,":",users.users[0])
                console.log("dlugosc tablicy", users.users.length)
                console.log("nazwa usera: ", user)
                if (users.users.length == 2) {
                    

                    if (users.users[0] == user) {
                        console.log("user1")
                        color = "1"
                    }
                    if (users.users[1] == user) {
                        console.log("user2")
                        color = "2"
                    }
                    logged = false;
                    gamestarted = true
                    game.gamestarted()

                }
                console.log(color)

            }
        }, 1000);

    }


    login() {
        console.log("login function")
        let login = document.getElementById("logininput").value
        
        
        if(login==""){
            login="ANONIMOWY"
        }
        user=login
        let body = JSON.stringify({ login: login })

        ui.oczekiwanie()

        const headers = { "Content-Type": "application/json" }

        return fetch("/handleLogin", { method: "post", body, headers })
            .then(response => response.json())
            .then(data => {
                return data.stan
            })
    }

    reset() {
        console.log("reset function")
        let reset = "reset"
        let body = JSON.stringify({ reset: reset })
        gamestarted = false
        const headers = { "Content-Type": "application/json" }
        return fetch("/reset", { method: "post", body, headers })
            .then(response => response.json())
            .then(data => {
                return data.stan
            })
    }

    ready() {
        console.log("ready function")
        const body = JSON.stringify({ wait: "waiting" })
        const headers = { "Content-Type": "application/json" }

        return fetch("/ready", { method: "post", body, headers })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    }


    ruch(pionek,pole){
        console.log("wysyłam ruch")
        let ruch=[]
        ruch[0]=pionek
        ruch[1]=pole
        const body = JSON.stringify({ ruch: ruch })
        const headers = { "Content-Type": "application/json" }
        
        return fetch("/ruch", { method: "post", body, headers })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    }



}
