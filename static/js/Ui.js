console.log("Ui")

class Ui {
    constructor() {
        this.login = document.getElementById("login")
        this.reset = document.getElementById("reset")

        this.login.addEventListener("click", this.loginfunction)
        this.reset.addEventListener("click", this.resetfunction)
    }
    async loginfunction() {
        let users = await net.login()
        console.log(users)

        let loginuiput = document.getElementById("logininput")
        console.log("loginek: " + loginuiput.value)
        document.getElementById("status").innerHTML=users
    }
    async resetfunction() {
        console.log("resecik")
        let reset = await net.reset()
        console.log(reset)
    }
}