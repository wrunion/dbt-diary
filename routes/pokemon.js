const db = require('../db')

const trainers = [
  { id: '1', name: 'Winter', favoritePokemon: 'pikachu', pokemon: ['squirtle', 'charizard', 'pikachu'] },
  { id: '2', name: 'Elle', favoritePokemon: 'scyther', pokemon: ['bulbasaur', 'scorbunny', 'pikachu', 'umbreon', 'scyther'] },
  { id: '3', name: 'Isnardo', favoritePokemon: 'bulbasaur',pokemon: ['squirtle', 'charizard', 'bulbasaur'] }
]

module.exports = (app) => {

  app.get('/pokemon', async (req, res) => {
    res.send('<h1>Pokemon</h1>')
  })

  app.get('/pokemon/upload', async (req, res) => {
    res.send('<form action="/pokemon/upload" method="POST"><input type="file"><button type="submit">Upload</button></form>')
  })

  app.post('/pokemon/upload', async (req, res) => {
    // if (req) { console.log(req) }
  })

  app.get('/pokemon/trainers/elle', async (req, res) => {
    res.send('You are on the add  pokemon page')
  })

  app.get('/pokemon/trainers/winter', async (req, res) => {
    res.send('You are on the add  pokemon page')
  })

  app.get('/pokemon/trainers/isnardo', async (req, res) => {
    res.send('You are on the add  pokemon page')
  })

  app.post('/pokemon/add', async (req, res) => {

  })

}

// app.get('/:id', (req, res, next) => {
//   db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, res) => {
//     if (err) {
//       return next(err)
//     }
//     res.send(res.rows[0])
//   })
// })