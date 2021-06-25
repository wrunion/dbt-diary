const db = require('../db')

// app.get('/:id', (req, res, next) => {
//   db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, res) => {
//     if (err) {
//       return next(err)
//     }
//     res.send(res.rows[0])
//   })
// })

module.exports = (app) => {

  app.get('/register', (req, res) => {
    res.render('email.ejs', { message: null })
  })

  app.post('/register', async (req, res) => {
    try {
      const newUser = await db.query('INSERT INTO production_email (email) VALUES ($1)', [req.body.email]);
      res.render('email.ejs', { message: 'User registered' });
    } catch (err) {
      next(err)
    }
  }


}
