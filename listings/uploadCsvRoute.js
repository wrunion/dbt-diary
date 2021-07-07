let express = require('express');
let router = express.Router();
let upload = require('./../config/multerConfig');
const csvWorker = require('./../utils/listingUtils.js');
 

exports.uploadFile = (req, res) => {
    try{
        const customers = [];
        fs.createReadStream(__basedir + "/uploads/" + req.file.filename)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
                console.error(error);
                throw error.message;
            })
            .on('data', row => {
                customers.push(row);
                console.log(row);
            })
            .on('end', () => {
              console.log('done')
            });
    } catch(error) {
       console.log(error)
    }
  }


// let path = __basedir + '/views/';

// router.get('/', (req,res) => {
//     console.log("__basedir" + __basedir);
//     res.sendFile(path + "index.html");
// });

// router.post('/api/file/upload', upload.single("file"), uploadFile);

// router.get('/api/file', csvWorker.downloadFile);

module.exports = router;


