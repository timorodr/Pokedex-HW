const express = require("express")

const router = express.Router()

const pokemon = require("../models/pokemon.js")


// ******** INDEX - get request to pokemon
router.get("/", (req, res) => {
    res.render("pokemon/index.ejs", {pokemon})
})

// ******** NEW - render page with form/button to create new fruit
router.get("/new", (req, res) => {
    res.render("pokemon/new.ejs")
})

// ******** CREATE - receives form/button data and creates  new pokemon then redirect back to index
router.post("/", (req, res) => {
    const body = req.body
    pokemon.push(body)
    // handle business in here
    res.redirect("/pokemon")
})

// ******** DESTROY - deletes a pokemon/redirects to index
router. delete("/:id", (req, res) => {
    const id = req.params.id
    // splice the array
    pokemon.splice(id, 1)
    res.redirect("/pokemon")
})

// ********* EDIT - render form/button a specific pokemon
router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    // pokemons id into a pokemon
    const poke = pokemon[id]
    res.render("pokemon/edit.ejs", {poke, id})
})

// ********* UPDATE - receives form data, updates
router.put("/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pokemon[id] = body
    res.redirect("/pokemon")
})


// ******** SHOW
router.get("/:id", (req, res) => {
    const id = req.params.id
    
    res.render("pokemon/show.ejs", {pokemon, id})
})


module.exports = router