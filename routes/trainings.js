const router = require("express").Router()
const training = require("../models/training.model")

// Create training
router.get("/trainings/create", (req, res) => {
    res.render("trainings/new-training")
})

router.post("/trainings/create", (req, res) => {
    const userID = req.session.currentUser._id

    console.log(userID)
    const { date, distance, time, pace } = req.body

    training.create({
        date,
        distance,
        time,
        pace,
        user: userID,
    })
    .then(createdtraining => {
        console.log("training created")
        res.redirect("/trainings")
    })
    .catch(err => {
        res.render("trainings/new-training", { errorMessage: "Wrong credentials." })
    })
})

// Get trainings
router.get("/trainings", (req, res) => {
    training.find()
    .then(trainings => {
        res.render("trainings/trainings", {trainings, user : req.session.currentUser})
    })
    .catch(err => {
        console.log(err)
    })
})

// Get training details
router.get("/trainings/:id", (req, res) => {
    const id = req.params.id

    training.findById(id)
    .then(training => {
        res.render("trainings/training-detail", { training })
    })
    .catch(err => {
        console.log(err)
    })
})

// Delete training
router.post("/trainings/:id/delete", (req, res) => {
    const id = req.params.id

    training.findByIdAndRemove(id)
    .then(deletedtraining => {
        res.redirect("/trainings")
    })
    .catch(err => {
        console.log(err)
    })
})

// Edit training
router.get("/trainings/:id/edit", (req, res) => {
    const id = req.params.id

    training.findById(id)
    .then(training => {
        res.render("trainings/edit-training", { training })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/trainings/:id/edit", (req, res) => {
    const id = req.params.id
    const { date, distance, time, pace } = req.body

    const training = {
        date,
        distance,
        time,
        pace
    }

    training.findByIdAndUpdate(id, training)
    .then(createdtraining => {
        res.redirect(`/trainings/${id}`)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router