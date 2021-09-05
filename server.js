const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const compression = require("compression")
const cors = require('cors')
const xClacksOverhead = require('./middleware/xClacksOverhead')
require('dotenv').config()
const backupDatabase = require('./backups')
const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT || 8000

backupDatabase()
// require('./backups/backupToJson')()
// require('./backups/createBackupTables')()
// require('./middleware/tarotGenerator')

/* Middleware */
app.use(cookieParser()); 
app.use(helmet());
app.use(compression());
app.use(express.static(__dirname));

app.use(compression({ filter: shouldCompress }))
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}
app.use(cors());
app.use(helmet.hidePoweredBy({ setTo: 'Blood, Sweat and Tears' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(xClacksOverhead)

/* Serve public assets */
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs')
/* Custom middleware to set headers */
const setHeaders = (req, res, next) => {
  /* This allows us to use inline js without console errors */
  res.set("Content-Security-Policy", "script-src 'self' http://* 'unsafe-inline'")
  next();
}
app.use(setHeaders)

app.get('/account', (req, res) => {
  res.send('Account')
})

app.get('/login', (req, res) => {
  res.send('Login')
})

/* Routes */
app.use('/api', require('./routes'))

/* Routes V2 */
app.use('/', require('./routes/routes-v2'))

/* Codewitch routes */
app.use('/codewitch', require('./routes/codewitch'))
/* DBT routes, V2 */ 
app.use('/dbt', require('./routes/dbt'))
/* Tarot routes */
app.use('/tarot', require('./routes/tarot'))

/* Global error handler */
app.use((err, req, res) => {
  console.log('Global error handler: ', err.message);
});

app.listen(PORT, () => {
  console.log(`Server is ready at port ${PORT}`)
})
