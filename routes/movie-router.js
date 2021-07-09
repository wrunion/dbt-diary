const express = require('express')
const db = require('./../mongo_db')
const MovieCtrl = require('../controllers/movie-ctrl')
const Day = require('./../models/day.js')
const router = express.Router()

// timestamp formatted like: Jul 08 2021
const getFormattedDate = () => Date().split(' ').slice(1, 4).join(' ').toString()

const insertData = async (req, res) => {
  try {
    const date = getFormattedDate();
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'No data received. Please verify input and try again',
      })
    }

    const entry = { ...body, date: date }
    const day = new Day(entry)
    if (!day) {
      return res.status(400).json({ success: false, error: err })
    }

    day.save().then(() => {
      return res.status(201).json({
        success: true,
        message: 'Entry created!',
        })
      }).catch(error => {
        return res.status(400).json({
          error,
          message: 'Entry not created. Please see error message',
        })
      })
  } catch (error) {
    console.error(error)
  }
}

const showDays = async (req, res) => {
  try {
    const data = await Day.find({})
    
    if (data && data.length > 0) {
      return res.status(200).json({ 
        success: true, 
        data: data 
      })
    }
  } catch (error) {
    console.error(error)
  }
}


router.post('/movie', MovieCtrl.createMovie)
router.put('/movie/:id', MovieCtrl.updateMovie)
router.delete('/movie/:id', MovieCtrl.deleteMovie)
router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/movies', MovieCtrl.getMovies)

/* Days */
router.post('/day', insertData)
router.get('/day', showDays)

module.exports = router