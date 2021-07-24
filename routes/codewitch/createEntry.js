const db = require('./../../db')

const createEntryQuery = `INSERT INTO codewitch_entry (focus, tarot, journal, gratitude, moon_phase, self_care, other) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`

const createEntry = async (req, res) => {
  try {
    const { focus, tarot, journal, gratitude, moon_phase, self_care, other } = req.body
    
    const entry = await db.query(createEntryQuery, [focus, tarot, journal, gratitude, moon_phase, self_care, other])

    return res.json({ 
      success: true,
      message: 'Entry created!',
      entry: entry.rows[0]
    })
  } catch (err) {
    console.error(err.message)
    return res.json({ 
      success: false,
      error: err.message
    })
  }
}

module.exports = createEntry