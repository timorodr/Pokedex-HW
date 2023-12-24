const express = require("express")

const router = express.Router()

const pokemons = require("../models/pokemons.js")


// ******** INDEX - get request to pokemon
router.get("/", (req, res) => {
    res.render("pokemons/index.ejs", {pokemons})
})

// ******** NEW - render page with form/button to create new fruit
router.get("/new", (req, res) => {
    const body = req.body
    if(body.addPokemon === "on") {
        body.addPokemon = true
    } else {
        body.addPokemon = false
    }
    res.render("pokemons/new.ejs", {pokemons})
})

// ******** CREATE - receives form/button data and creates  new pokemon then redirect back to index
router.post("/", (req, res) => {
    const body = req.body
    if(body.addPokemon === "on") {
        body.addPokemon = true
    } else {
        body.addPokemon = false
    }
    console.log("req.body", req.body)
    // Build the pokemon before we push to the array
    let newPokemon = {
        ...pokemons[0], // Spread op creates a shallow copy of the pokemon data structure!
        
        // Overwrite/rewrite/reassign the pokemon template with our form data
        name: req.body.name,
        img: "https://i.etsystatic.com/33357979/r/il/e1dfcd/3584257734/il_570xN.3584257734_bfy9.jpg"

    }
    console.log(newPokemon)

    pokemons.unshift(newPokemon)
    // handle business in here
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
    if(body.addPokemon === "on") {
        body.addPokemon = true
    } else {
        body.addPokemon = false
    }
    const newName = req.body.name
    const pokemon = pokemons[id]
    pokemon.name = newName
    res.redirect("/pokemons")
})


// ******** SHOW
router.get("/:id", (req, res) => {
    const id = req.params.id
    const pokemon = pokemons[id]
    console.log(pokemon)
    res.render("pokemons/show.ejs", {pokemon, id})
})


module.exports = router