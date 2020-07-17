const router = require("express").Router()
const MovieController = require('../controllers/movies')

router.get("/movie", MovieController.find)
router.get("/movie/:id", MovieController.findById)
router.post("/movie", MovieController.add)
router.put("/movie/:id", MovieController.update)
router.delete("/movie/:id", MovieController.delete)

module.exports = router