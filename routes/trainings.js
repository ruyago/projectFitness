const router = require("express").Router()
const training = require("../models/training.model")

// Create training
router.get("/trainings/create", (req, res) => {
    res.render("trainings/new-training")
})

router.post("/trainings/create", (req, res) => {
    const userID = req.session.currentUser._id

    console.log("USERID: ", userID)
    const { date, exercise, sets, reps } = req.body

    training.create({
        date,
        exercise,
        sets,
        reps,
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
        res.render("trainings/trainings", { trainings, user : req.session.currentUser  })
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
        res.render("trainings/training-detail", { training, user : req.session.currentUser })
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
    const { date, exercise, sets, reps } = req.body

    const training = {
        date,
        exercise,
        sets,
        reps
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