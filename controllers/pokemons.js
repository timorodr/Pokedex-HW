const express = require("express")

const router = express.Router()

const pokemons = require("../models/pokemons.js")


// ******** INDEX - get request to pokemon
router.get("/", (req, res) => {
    res.render("pokemons/index.ejs", {pokemons})
})

// ******** NEW - render page with form/button to create new pokemon
router.get("/new", (req, res) => {
 
    res.render("pokemons/new.ejs", {pokemons})
})

// ******** CREATE - receives form/button data and creates  new pokemon then redirect back to index
router.post("/", (req, res) => {
    const body = req.body
   
    console.log("req.body", req.body)
    // Build the pokemon before we push to the array
    let newPokemon = {
        ...pokemons[0], // Spread op creates a shallow copy of the pokemon data structure!
        // Overwrite/rewrite/reassign the pokemon template with our form data
        name: req.body.name,
        img: "https://images5.fanpop.com/image/photos/26800000/Moustache-Pikachu-FTW-random-26829391-500-500.jpg",
        id: "Your fav number ID number",
        stats: "MOUSTACHE PIKACHU IS EVOLVING".split("\n"),
        type: "I aint got no type",
    }
    pokemons.unshift(newPokemon)
    res.redirect("/pokemons")
})

// ******** DESTROY - deletes a pokemon/redirects to index
router.delete("/:id", (req, res) => {
    const id = req.params.id
    // splice the array
    pokemons.splice(id, 1)
    res.redirect("/pokemons")
})

// ********* EDIT - render form/button a specific pokemon
router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    const newName = req.body.name
    // pokemons id into a pokemon
    const pokemon = pokemons[id]
    pokemon.name = newName
    
    res.render("pokemons/edit.ejs", {pokemon, id})
})

// ********* UPDATE - receives form data, updates
router.put("/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    const newName = req.body.name
    const pokemon = pokemons[id]
    pokemon.name = newName
    const newId = req.body.id
    pokemon.id = newId
    res.redirect("/pokemons")
})


// ******** SHOW
router.get("/:id", (req, res) => {
    const id = req.params.id
    const pokemon = pokemons[id]
    res.render("pokemons/show.ejs", {pokemon, id})
})


module.exports = router