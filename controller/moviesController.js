import moviesModal from "../model/moviemodal.js"


const getMovies = async (req, res) => {
  try {

    console.log(req.query);


    // const movies = await moviesModal.find({ duration: req.query.duration * 1, rating: req.query.rating * 1 })
    // const movies = await moviesModal.find()
    //   .where("duration")
    //   .equals(req.query.duration)
    //   .where("rating")
    //   .equals(req.query.rating)


    // before sort 
    // const movies = await moviesModal.find(req.query)

    const array = ["page", "limit", "sort",]

    array.forEach((el) => {
      delete req.query[el]
    })

    // console.log("after sort", req.query);

    // step4
    let queryObj = JSON.stringify(req.query)
    queryObj = queryObj.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`)
    const query = JSON.parse(queryObj)
    console.log(query);

    const movies = await moviesModal.find(query)


    res.status(200).json({
      status: "success",
      length: movies.length,
      data: movies,
    })
  } catch {
    res.status(500).json({ message: "Error fetching movies" })
  }
}

const postMovies = async (req, res) => {
  try {
    const newMovie = await moviesModal.create(req.body)
    res.status(201).json({
      status: "success",
      data: newMovie
    })
  } catch {
    res.status(500).json({
      message: "Error creating movie"
    })
  }

}

const getSpecificMovie = async (req, res) => {
  try {
    const data = await moviesModal.findById(req.params.id)
    res.status(200).json({
      movie: data
    })
  } catch {
    res.status(500).json({ message: "Error fetching movie" })
  }


}

const updateMovie = async (req, res) => {
  try {
    const data = await moviesModal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: "movie is update",
      data: data
    })
  } catch {
    res.status(500).json({ message: "Error updating movie" })
  }
}

const deleteMovie = async (req, res) => {
  try {
    const data = await moviesModal.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Movie deleted" })
  } catch {
    res.status(500).json({ message: "Error deleting movie" })
  }
}

export {
  getMovies,
  postMovies,
  getSpecificMovie,
  updateMovie,
  deleteMovie
}