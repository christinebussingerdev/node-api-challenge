const express = require('express')

const db = require('../data/helpers/actionModel')

const router = express.Router()

// GET ALL PROJECT
router.get('/', (req, res) => {
  db.get()
    .then(posts => { // SUCCESS
      res.status(200).json(posts)
    })
    .catch(err => { // can't find projects
      console.log(err)
      res.status(500).json({ error: "The project information could not be retrieved." })
    })
})

// ADD PROJECT
router.post('/', (req, res) => {
  const newProject = req.body

  if (newProject.name && newProject.description) {
    db.insert(newProject)
      .then(() => { // SUCCESS
        res.status(201).json(newProject)
      })
      .catch(err => { // saving project failed
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the project to the database" })
      })
  } else { // info missing
    res.status(400).json({ errorMessage: "Please provide name and description for the project." })
  }
})

// UPDATE PROJECT BY ID
router.put('/:projectId', (req, res) => {
  const newProjectInfo = req.body // set new post info

  if (newProjectInfo.name && newProjectInfo.description) { // check for required info
    
    const requestedProject = db.get(req.params.projectId) // grab post

    if (requestedProject) {
      db.update(req.params.projectId, req.body)
      .then(() => { // SUCCESS
        res.status(200).json(newProjectInfo)
      })
      .catch(err => { // if update fails
        console.log(err)
        res.status(500).json({ error: "The project information could not be modified." })
      })
    } else { // project id isn't valid
      res.status(404).json({ message: "The project with the specified ID does not exist." })
    }

  } else { // project missing info
    res.status(400).json({ errorMessage: "Please provide name and description for the project." })
  }
})

// DELETE PROJECT BY ID
router.delete('/:projectId', (req, res) => {
  const projectToDelete = db.get(req.params.projectId) // grab relevant project

  if (projectToDelete) {
    db.remove(req.params.projectId)
      .then(removedProject => { // SUCCESS
        res.sendStatus(204)
      })
      .catch(err => { // if removing project fails
        res.status(500).json({ error: "The project could not be removed" })
      })
  } else { // if project isn't found
    res.status(404).json({ message: "The project with the specified ID does not exist." })
  }
})


module.exports = router