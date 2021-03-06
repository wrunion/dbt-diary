const express = require('express')
const router = express.Router()

/* 
 * This file combines the other routes in one place 
 * and passes a single router object between them
*/

/* GET Routes */
require('./getQuote')(router)
require('./getEntry')(router)
require('./codewitchRoutes')(router)

/* POST Routes */
require('./createOrEditEntry')(router)
require('./favoriteEntry')(router)
require('./createQuote')(router)
require('./weekRoutes')(router)

/* DEMO ROUTES */
require('./demoRoutes')(router)


module.exports = router