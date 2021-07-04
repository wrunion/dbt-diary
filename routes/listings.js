const db = require('./../db')
const auth = require('../middleware/authMiddleware')
const multer = require('multer')
var upload = multer({ dest: 'uploads/' })

/* 
  use res.set for HTTP headers. IE:

  res.set('Content-Type', 'text/html')
  
  - or - 

  res.set({
    'Content-Type': 'text/plain',
    'Content-Length': '123',
    ETag: '12345'
  })

  res.status(200) works for status and can be chained
*/

module.exports = (app) => {

  // Middleware protecting routes to logged in users only
  app.use(auth.isLoggedIn);

  /* GET routes */
  app.get('/listings/upload', (req, res) => {
    res.render('./listings/upload.ejs', {
      activeTab: 'listingsUpload'
    })
  })

  app.get('/listings/preview', (req, res) => {
    res.render('./listings/preview.ejs', {
      activeTab: 'listingsPreview'
    })
  })

  app.get('/listings/update', (req, res) => {
    res.render('./listings/update.ejs', {
      activeTab: 'listingsUpdate'
    })
  })

  /* POST and PUT routes */

  /* uses multer middleware's "upload" function to receive csv input */
  app.post('/listings/upload', upload.single('csv'), (req, res) => {
    if (req.files) {
      console.log(req.files)
    } 
  })

  // Add't handlers for procesing the CSV data, JSON verification,
  // and Postgres insertion can go here

  app.post('/listings/preview', (req, res) => {
    // TODO
  })

  app.post('/listings/update', (req, res) => {
    // TODO
  })

}
