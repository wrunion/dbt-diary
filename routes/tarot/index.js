const express = require('express')
const router = express.Router()

/* 
 * This file combines the other routes in one place 
 * and passes a single router object between them
*/

// GET Routes 

// POST Routes 
require('./createDraw')(router)

module.exports = router