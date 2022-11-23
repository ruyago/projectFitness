const router = require("express").Router()
const training = require("../models/training.model")
const { format } = require('date-fns')
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
            const newTrainings = trainings.map(training => ({ ...training.toJSON(), date: format(new Date(training.date), 'dd/MM/yyyy') }))
            res.render("trainings/trainings", { newTrainings, user: req.session.currentUser })
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
            const newTraining = { ...training.toJSON(), date: format(new Date(training.date), 'dd/MM/yyyy') }
            res.render("trainings/training-detail", { newTraining })
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
            console.log(training)
            res.render("trainings/edit-training", { training })
        })
        .catch(err => {
            console.log(err)
        })
})
router.post("/trainings/:id/edit", (req, res) => {
    const { id } = req.params
    const { date, distance, time, pace } = req.body
    const trainingData = {
        date,
        distance,
        time,
        pace
    }
    // const newTraining = { ...trainingData, date: format(new Date(trainingData.date), 'dd/MM/yyyy') }
    training.findByIdAndUpdate(
        id,
        trainingData,
        { new: true })
        .then(createdtraining => {
            res.redirect(`/trainings/${id}`)
        })
        .catch(err => {
            console.log(err)
        })
})
module.exports = router