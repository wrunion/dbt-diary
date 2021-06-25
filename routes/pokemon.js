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

  // Dummy auth function with no logic yet
  // const isAuth = () => next()

  const trainers = [
    { id: '1', name: 'Winter', pokemon: ['squirtle', 'charizard', 'pikachu'] },
    { id: '2', name: 'Elle', pokemon: ['bulbasaur', 'scorbunny', 'pikachu', 'umbreon', 'scyther'] },
    { id: '3', name: 'Isnardo', pokemon: ['squirtle', 'charizard', 'bulbasaur'] }
  ]

  app.get('/pokemon', async (req, res) => {
    res.send('You are on the pokemon page')
  })

  app.get('/pokemon/add', async (req, res) => {
    res.send('You are on the add  pokemon page')
  })

  app.post('/pokemon/add', async (req, res) => {
    
  })

}