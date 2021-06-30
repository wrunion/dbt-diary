const db = require('./../db')
const multer = require('multer')
var upload = multer({ dest: 'uploads/' })

/* POST & PUT handlers for listings data */
module.exports = (app) => {

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
