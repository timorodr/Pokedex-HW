const express = require("express")

const app = express()

const morgan = require("morgan")

const methodOverride = require("method-override")



const pokemonsRouter = require("./controllers/pokemons.js")

const pokemons = require("./models/pokemons.js")


app.use(express.static("public"))

app.use(express.urlencoded({extended: true}))

app.use(morgan("dev"))

app.use(methodOverride("_method"))

app.use("/pokemons", pokemonsRouter)












app.listen(3000, () => {
    console.log("is this thing on?")
})