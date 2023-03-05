/*
The codes that are below was used to give  genres data to the mongodb database. 


const mongoose = require('mongoose');
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/vidly');
}
  
main().catch(err => console.log("could not connect to mangoDB", err));
main().then(()=>console.log("connected to mangoDB"))

//  genres data
let genres0 = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Science fiction",
    "Fantasy",
]



const genresSchema = new mongoose.Schema({
    type: [String]
})

const Genres = mongoose.model("Genres", genresSchema)

async function createGenres(){
    const genresDocument = new Genres({ type: genres0 })
    try{
      const result = await genresDocument.save()
      console.log(result)
    }
    catch(ex){ 
        for(field in  ex.errors)
            console.log(ex.errors[field].message)
    }

}

createGenres()
*/