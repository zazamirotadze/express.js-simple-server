var express = require('express')
var router = express.Router()


//  genres data
let genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Science fiction",
    "Fantasy",
]
//
//  "/api/genres" - endpoint
router.get('', function (req, res) {
    res.send(genres)
})
//


//  "/api/genres/:arrNum" - endpoint
router.get('/:arrNum', function (req, res) {
    if(genres[req.params.arrNum]){
        res.send(genres[req.params.arrNum])
    }else{
        res.status(404).send("The server cannot find the requested resource")
    }
})
//

// add genre 
router.post('', function (req, res) {
    const  newGenre  = req.body
    const foundGenre = genres.find(genre => genre === newGenre)
    if(newGenre.length>0){
        if(foundGenre){
            res.status(400).send("There is already the ganre with the same name in the list")
        }else{
            genres.push(newGenre)
            res.send(`new genre called ${newGenre} is added into the list`)
        }
    }else{
        res.status(400).send("genre must have at least one character")
    }
})
//

// update a genre
router.put('/:arrNum', function (req, res) {
    const updatedGenre = req.body
    let genreToUpdate = genres[req.params.arrNum]

    if(genreToUpdate){
        if(updatedGenre.length>0){
            if(genreToUpdate === updatedGenre){
                res.status(400).send(`The names are exactly the same. \n old Value : ${genreToUpdate} ; \n new Value: ${updatedGenre} `)
            } else {
                res.send(`the old genre was ${genreToUpdate} and now new genre is ${updatedGenre}`)
                genres[req.params.arrNum] = updatedGenre
            }
        }else{
            res.status(400).send("genre must have at least one character")
        }
    }else{
        res.status(400).send("an incorrect arrNum was given")
    }
})
//


// delete a genre
router.delete('/:arrNum', function (req, res) {
    let genreToDelete = genres[req.params.arrNum]
    if(genreToDelete){
        res.send(`${genreToDelete} is deleted`)
        const filteredGenres = genres.filter(genre => genre !== genreToDelete)
        genres = filteredGenres
    }else{
        res.status(400).send("an incorrect arrNum was given")
    }
})
//


module.exports = router