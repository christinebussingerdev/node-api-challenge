const express = require('express')

const db = require('./projectModel')

const project = express.Router()


// GET ALL PROJECT
router.get('/', (req, res, next) => {
  db.get()
    .then(projects => { // SUCCESS
      res.status(200).json(projects)
    })
    .catch(err => { // can't find projects
      console.log(err)
      res.status(500).json({ error: "The project information could not be retrieved." })
    })
})

// ADD PROJECT
router.post('/', checkProjectData(), (req, res, next) => {
  db.insert(req.newProject)
  .then(() => {
    res.status(201).json(req.newProject)
  })
  .catch(err => { // saving project failed
    next(err)
  })
})

// UPDATE PROJECT BY ID
router.put('/:projectId', checkForProject(), checkProjectData(), (req, res, next) => {
      db.update(req.params.projectId, req.body)
      .then(() => { // SUCCESS
        res.status(200).json(req.newProject)
      })
      .catch(err => { // if update fails
        console.log(err)
        res.status(500).json({ error: "The project information could not be modified." })
      })

})

// DELETE PROJECT BY ID
router.delete('/:projectId', checkForProject(), (req, res, next) => {
    db.remove(req.params.projectId)
      .then(removedProject => { // SUCCESS
        res.sendStatus(204)
      })
      .catch(err => { // if removing project fails
        res.status(500).json({ error: "The project could not be removed" })
      })
})

function checkProjectData() {
  return (req, res, next) => {
    const newProjectData = req.body
    if (newProjectData.name && newProjectData.description) {
          req.newProject = newProjectData
          next()
    }
    else {
      return res.status(400).json({ errorMessage: "Please provide name and description for the project." })
    }
  }
}

function checkForProject() {
  return (req, res, next) => {
    const requestedProject = db.get(req.params.projectId)
    if (requestedProject) {
      next()
    }
    else {
      res.status(404).json({ message: "The project with the specified ID does not exist." })
    }
  }
}

module.exports = project