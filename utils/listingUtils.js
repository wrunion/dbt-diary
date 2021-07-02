/* Helper functions 
 * for the "upload," "preview," and "approve" 
 * POST and PUT routes
 * 
 * See also: Elle's API spec: https://bit.ly/3AiZzHm
*/

// This is currently just a mockup for testing
// and discussion purposes  

const errorData = {
  err_1: { 
    errorCode: 415, 
    pageTitle: 'Error: The CSV was not readable'
  },
  err_2: { 
    errorCode: 422, 
    pageTitle: 'Error: The following listings were not formatted correctly:'
  },
  err_3: {
    errorCode: 500, // we can't actually send this as an error code; it will crash the app
    pageTitle: 'Error: Please contact your website administrator'
  }
}

/* Code for Error 1 */
// from Elle's API spec: https://bit.ly/3AiZzHm
const convertToJson = async (csv, params) => {
  try {
    // convert the CSV to JSON here

    // return data or false
  } catch (error) {
    next(error)
  }
}

  const validateJsonSchema = async (csv, params) => {
    // do the validation
    // return true or false
  }

  /* Per the API spec: 
   * Validate that the file type is valid and not null
   * convert CSV data to JSON
   * return data on success
   * return 415 error code on failure
  */
  app.post('/listings/upload', upload.single('csv'), 
    async (req, res) => {
    try {
      if (req.files) {

        const json = await convertToJson(req.files);

        if (!json) {
          res.render('./listings/upload.ejs', {
            pageTitle: 'Error: The CSV was not readable'
            // also, return a 415 error code
          })
        }

        const isValid = await validateJsonSchema(csv);

        if (!isValid) {
          res.render('./listings/upload.ejs', {
            pageTitle: 'Error: The following listings were not formatted correctly:'
            // also, return a 422 error code
          })
        }

        // If the above two tests have passed, 
        // the data has been parsed and validated
        // Take the user to the next step.
        res.render('./listings/preview.ejs', {
          activeTab: 'listingsPreview'
          // 200 OK returns automatically when we send data
        })
      } 
    } catch (err) {
      // Pass the err to the global error handler we configured in server.js
      next(err);
    }
  })






module.exports = {

}