const express = require('express')
const router = express.Router()

/* 
 * This file combines the other routes in one place 
 * and passes a single router object between them
*/

require('./createEntry')(router)

module.exports = router