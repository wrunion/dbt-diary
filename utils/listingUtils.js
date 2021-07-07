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
    // convert the CSV to JSON here


    /* TODO */



    


}

  const validateJsonSchema = async (csv, params) => {
    // do the validation
    // return true if valid 
    // Used in the /listings/upload POST route (see routes/listings.js)
  
  
    /* TODO */
  
  
  
  
  
  
  
  
  }
