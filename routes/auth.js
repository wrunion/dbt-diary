const db = require('../db')
const bcrypt = require('bcrypt');
const routes = require('.');

/* Helper functions for creating and authenticating users */

const checkUser = async email => {
  const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);
  return(res.rows.length > 0);
}

const getUser = async email => {
  const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);
  // This is unnecessarily long, I know, but my version of node won't let me use the "res?.rows" syntax, so it's necessary until I can upgrade
  /* If no user, return false */
  if (!res || !res.rows || res.rows.length < 1) { return false; }
  // the pg response object returns the data in the "rows" array object
  // in this case, there should only be one row
  /* If user, return user */
  return(res.rows[0]);
}

const isValid = async (password, user) => {
  const isMatch = await bcrypt.compare(password, user.password);
  return (isMatch);
}

module.exports = (app) => {

  // app.post('/login', async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     // Method either returns the user object from postgres, 
  //     // or "false" if the email isn't registered
  //     const user = await getUser(email);
  //     /* Tell passport there is no error (null) but no user (false) */
  //     if (!user) { return done(null, false, { 
  //       message: 'Incorrect email address' 
  //     }) }
  //     /* Compare passwords using bcrypt */
  //     const correctPassword = isValid(user, password);
  //     /* User is valid. Pass the user object to Passport */
  //     if (correctPassword) { return(done, user) }

  //     return(done, false, { 
  //       message: 'Password is incorrect'
  //     });
  //   } catch (err) {
  //     return done(err);
  //   }
  // })

  // app.get('/user', (req, res) => {
  //   res.render('user.ejs', { activeTab: 'home', message: null })
  //   }
  // )

  // Temp route while internet is down
  app.post('/login', (req, res) => {
    res.render('home.ejs', { activeTab: 'home' })
  })

  app.post('/user/add', async (req, res) => {
    try {
    const { name, role, email, password } = req.body;
    // First, check if email is already registered 
    // Emails must be unique in our system
    const user = await checkUser(email);
    if (user) { 
      res.render('user.ejs', { activeTab: 'home', message: 'Email is already registered' })
      console.log('email already registered')
      return;
    }

    // Create a secure version of the password, create new user
    // 10 is the number of salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRes = await db.query('INSERT INTO development_user (name, role, email, password) VALUES ($1, $2, $3, $4)', [name, role, email, hashedPassword]);
    if (userRes.rows && userRes.rows.length > 0) {

    
    // res.render('user.ejs', { activeTab: 'home', message: 'User registered!' })
    console.log('registered')
    }
    } catch (err) {
      console.log(err)
    }
    }
  )

}

