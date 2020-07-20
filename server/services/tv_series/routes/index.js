const router = require("express").Router()
const TvController = require('../controllers/tv')

router.get("/tv", TvController.find)
router.get("/tv/:id", TvController.findById)
router.post("/tv", TvController.add)
router.put("/tv/:id", TvController.update)
router.delete("/tv/:id", TvController.delete)

module.exports = router