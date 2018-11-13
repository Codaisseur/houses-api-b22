const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const House = require('./models/house')

// Read = GET
app.get('/houses', function (req, res, next) {
  House.findAll()
    .then(houses => res.json({ houses: houses }))
    .catch(error => {
      console.error(error)
      res
        .status(500)
        .json({ message: "An error occurred, please try again." })
    })
})

// Read = GET
app.get('/houses/:id', function (req, res, next) {
  const id = req.params.id
  House.findById(id)
    .then(house => {
      if (!house) {
        return res
          .status(404)
          .json({ message: "Not Found!" })
      }
      res.json({ house: house })
    })
    .catch(error => {
      console.error(error)
      res
        .status(500)
        .json({ message: "An error occurred, please try again." })
    })
})

// Create = POST
app.post('/houses', function (req, res) {
  console.log('Incoming data: ', req.body)
  const { title, description, size, price } = req.body
  House
    .create({ title, description, size, price })
    .then(house => {
      res
        .status(201)
        .json({ house })
    })
    .catch(error => {
      console.error(error)
      res
        .status(500)
        .json({ message: "An error occurred, please try again." })
    })
})

// Update = PUT
app.put('/houses/:id', function (req, res) {
  const id = req.params.id
  House.findById(id)
    .then(house => {
      if (!house) {
        return res
          .status(404)
          .json({ message: "Not Found!" })
      }

      const { title, description, size, price } = req.body
      const fields = Object.keys(req.body)

      house.update({ title, description, size, price }, { fields })
        .then(updatedHouse => res.json({ house: updatedHouse }))
    })
    .catch(error => {
      console.error(error)
      res
        .status(500)
        .json({ message: "An error occurred, please try again." })
    })
})

// Delete = DELETE
app.delete('/houses/:id', function (req, res) {
  const id = req.params.id
  House.findById(id)
    .then(house => {
      if (!house) {
        return res
          .status(404)
          .json({ message: "Not Found!" })
      }

      house.destroy()
        .then(_ => {
          res
            .status(204)
            .json()
        })
    })
    .catch(error => {
      console.error(error)
      res
        .status(500)
        .json({ message: "An error occurred, please try again." })
    })
})

app.listen(4000, function () {
  console.log('Web server listening on port 4000')
})
