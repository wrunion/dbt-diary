// 401 = unauthenticated
// 403 = unauthorized
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const db = require('../db')
const jwtGenerator = require('../utils/jwtGenerator')
const authorize = require('../middleware/authorize')

// helper util for login
const getUserByEmail = async (email) => {

  const response = await db.query(
    `SELECT * FROM development_user WHERE email = $1`, [email]
    )
  const user = response.rows[0] 

  return user ? user : false
}

router.post('/login', asyncHandler(async(req, res) => {
  const { email, password } = req.body

  const user = await getUserByEmail(email)
  if (!user) {
    return res.status(403).send('No user with that email address')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (passwordMatch) {
    const jwtToken = jwtGenerator(user.email)

    return res.json({ jwtToken })

  } else {
    return res.status(403).send('Incorrect password')
   }
}))

// test route showing that the "authorize" middleware
// works as intended
router.post("/verify", authorize, (req, res) => {
  try {
    console.log(req.user)
    res.send('verified');

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


router.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.DEVELOPMENT === true ? err : {};

  res.status(err.status || 500);
  console.log(err.message)
});

module.exports = router