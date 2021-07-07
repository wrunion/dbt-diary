const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, __basedir + '/uploads/')
   },
    filename: (req, file, cb) => {
       cb(null, file.fieldname + '-' + Date.now() + '.csv')
    }
  });   
   
const upload = multer({ storage: storage });

module.exports = upload;