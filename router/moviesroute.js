import express from "express"
import { getMovies, postMovies, updateMovie, deleteMovie, highestRated, getSpecificMovie } from "../controller/moviesController.js"

const router = express.Router()

router.use(express.json())

router.get("/higest-rated", highestRated, getMovies)

router.get("/", getMovies)
router.post("/", postMovies)

router.get("/:id", getSpecificMovie)
router.patch("/:id", updateMovie)
router.delete("/:id", deleteMovie)


export default router