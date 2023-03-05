var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/vidly');
}
  
main().catch(err => console.log("could not connect to mangoDB", err));
main().then(()=>console.log("connected to mangoDB"))
const genresSchema = new mongoose.Schema({
    type: [String]
})
const Genres = mongoose.model("Genres", genresSchema)
async function getGenres(){
    const genres0 = await Genres.find();
    return genres0[0].type
}

//  "/api/genres" - endpoint
router.get('', async function (req, res) {
      const genres1 = await getGenres();
      res.send(genres1);
});
//


//  "/api/genres/:arrNum" - endpoint
router.get('/:arrNum', async function (req, res) {
    const genres1 = await getGenres();
    if(genres1[req.params.arrNum]){
        res.send(genres1[req.params.arrNum])
    }else{
        res.status(404).send("The server cannot find the requested resource")
    }
})
//

// add genre 
router.post('', async function (req, res) {
    const newGenre = req.body
    const genres1 = await Genres.findOne({ _id: "6403580bb041dc40e0490da9" });
    
    const foundGenre = genres1.type.find(genre => genre === newGenre)
    if(newGenre.length>0){
        if(foundGenre){
            res.status(400).send("There is already the ganre with the same name in the list")
        }else{
            genres1.type.push(newGenre)
            await genres1.save();
            res.send(`new genre called ${newGenre} is added into the list`)
        }
    }else{
        res.status(400).send("genre must have at least one character")
    }
})
//

// update a genre
router.put('/:arrNum', async function (req, res) {
    const updatedGenre = req.body
    let genres1 = await Genres.findOne({ _id: "6403580bb041dc40e0490da9" });
    let genreToUpdate = genres1.type[req.params.arrNum]

    if(genreToUpdate){
        if(updatedGenre.length>0){
            if(genreToUpdate === updatedGenre){
                res.status(400).send(`The names are exactly the same. \n old Value : ${genreToUpdate} ; \n new Value: ${updatedGenre} `)
            } else {
                res.send(`the old genre was ${genreToUpdate} and now new genre is ${updatedGenre}`)
                genres1.type[req.params.arrNum] = updatedGenre
                await genres1.save();
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
router.delete('/:arrNum', async function (req, res) {
    let genres1 = await Genres.findOne({ _id: "6403580bb041dc40e0490da9" });
    const genreToDelete = genres1.type[req.params.arrNum]
    if(genreToDelete){
        res.send(`${genreToDelete} is deleted`)
        genres1.type = genres1.type.filter(genre => genre !== genreToDelete)
        await genres1.save();
    }else{
        res.status(400).send("an incorrect arrNum was given")
    }
})
//


module.exports = router