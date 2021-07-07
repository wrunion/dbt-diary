const db = require('./../db')
const auth = require('../middleware/authMiddleware')
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
const upload = require('./../config/multerConfig')
const fs = require('fs')
const csv = require('fast-csv')
const path = require('path')

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
  // "listings" here refers to the name of the file input field
  // in the form itself. Multer requires it to match
  // app.post('/listings/upload', upload.single('listings'), (req, res) => {
  //   if (req.file) {
  //     console.log(req.file)

  //   } 
  // })


  // TEMP
  app.post('/listings/upload', upload.single('listings'), (req, res) => {
    try{
      // console.log(req.file.filename)
      const listings = [];

      console.log(__dirname)
      // fs.readFile('./../uploads/' + '9a8092c301b32f65219fbf795c8356fa', 'utf8' , (err, data) => {
      //   if (err) {
      //     console.error(err)
      //     return
      //   }
      //   console.log(data)
      // })

      // fs.createReadStream('./../uploads/csv/' + req.file.filename)
      //   .pipe(csv.parse({ headers: true }))
      //   .on('error', error => {
      //     console.error(error);
      //     throw error.message;
      //   })
      //   .on('data', row => {
      //     listings.push(row);
      //     console.log(row);
      //   })
      //   .on('end', () => {
      //     /* Parse to JSON here??? */
      //     // Do the "upload was successful" thing

      //     console.log('upload successful!')

      // });
    } catch(error) {
      console.error('csv upload error', error)
    }
  });


  app.post('/listings/preview', (req, res) => {

    /* TODO */




  })

  app.post('/listings/update', (req, res) => {

    /* TODO */



    
  })

  /* Per the API spec: 
   * Validate that the file type is valid and not null
   * convert CSV data to JSON
   * return data on success
   * return 415 error code on failure
  */

  // app.post('/listings/upload', upload.single('csv'), 
  //   async (req, res) => {
  //   try {
  //     if (req.files) {

  //       const json = await convertToJson(req.files);

  //       if (!json) {
  //         res.render('./listings/upload.ejs', {
  //           pageTitle: 'Error: The CSV was not readable'
  //           // also, return a 415 error code
  //         })
  //       }

  //       const isValid = await validateJsonSchema(csv);

  //       if (!isValid) {
  //         res.render('./listings/upload.ejs', {
  //           pageTitle: 'Error: The following listings were not formatted correctly:'
  //           // also, return a 422 error code
  //         })
  //       }

  //       // If the above two tests have passed, 
  //       // the data has been parsed and validated
  //       // Take the user to the next step.
  //       res.render('./listings/preview.ejs', {
  //         activeTab: 'listingsPreview'
  //         // 200 OK returns automatically when we send data
  //       })
  //     } 
  //   } catch (err) {
  //     // Pass the err to the global error handler we configured in server.js
  //     next(err);
  //   }
  // })

}