const express = require('express')

const db = require('./actionModel')

const action = express.Router()

// GET ALL ACTIONS
action.get('/', (req, res, next) => {
  db.get()
    .then(actions => { // SUCCESS
      res.status(200).json(actions)
    })
    .catch(err => { // can't find actions
      console.log(err)
      res.status(500).json({ error: "The actions information could not be retrieved." })
    })
})

// ADD ACTION
action.post('/:projectId', (req, res, next) => {
  const newAction = {
    ...req.body, project_id: req.params.projectId
  } // set new action info

  if (newAction.description && newAction.notes && newAction.project_id) {
    db.insert(newAction)
      .then(() => { // SUCCESS
        res.status(201).json(newAction)
      })
      .catch(err => { // saving action failed
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the action to the database" })
      })
  } else { // info missing
    res.status(400).json({ errorMessage: "Please specify a description, notes, and a project id (in your url) for the action." })
  }
})

// UPDATE ACTION BY ID
action.put('/:projectId', (req, res, next) => {
  const newAction = {
    ...req.body, project_id: req.params.projectId
  } // set new action info

  if (newAction.description && newAction.notes && newAction.project_id) {
    
    const requestedAction = db.get(req.params.projectId) // grab action

    if (requestedAction) {
      db.update(req.params.projectId, req.body)
      .then(() => { // SUCCESS
        res.status(200).json(newAction)
      })
      .catch(err => { // if update fails
        console.log(err)
        res.status(500).json({ error: "The action information could not be modified." })
      })
    } else { // action id isn't valid
      res.status(404).json({ message: "The action with the specified ID does not exist." })
    }

  } else { // action missing info
    res.status(400).json({ errorMessage: "Please specify a description, notes, and a project id (in your url) for the action." })
  }
})

// DELETE PROJECT BY ID
action.delete('/:projectId', (req, res, next) => {
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

function checkActionData() {
  return (req, res, next) => {
    const newAction = {
      ...req.body, project_id: req.params.projectId
    }

    if (newAction.description && newAction.notes && newAction.project_id) {
      req.newAction = newAction
      next()
    }
  }
}

module.exports = action