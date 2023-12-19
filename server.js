const express = require("express")

const app = express()

const morgan = require("morgan")

const methodOverride = require("method-override")



const pokemonRouter = require("./controllers/pokemon.js")

const pokemon = require("./models/pokemon.js")


app.use(express.static("public"))

app.use(express.urlencoded({extended: true}))

app.use(morgan("dev"))

app.use(methodOverride("_method"))

app.use("/pokemon", pokemonRouter)












app.listen(3000, () => {
    console.log("is this thing on?")
})