const express = require('express')
const router = express.Router()

/* 
 * This file combines the other routes in one place 
 * and passes a single router object between them
*/

// GET Routes 
require('./getQuoteByDate')(router)
require('./getEntries')(router)

// POST Routes 
require('./createEntry')(router)
require('./createQuote')(router)

module.exports = router