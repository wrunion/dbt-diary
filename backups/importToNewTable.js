const data = require('./files/data.json')
const db = require('./../db')

const journalEntries = data.filter(e => e.journal_data !== null)
const journalEntriesToEnter = journalEntries.map(e => {
  return {
    date: e.date, 
    entry_type: 'journal',
    entry:  e.journal_data
  }
})

const ratingEntries = data.filter(e => e.rating_data !== null)
const ratingEntriesToEnter = ratingEntries.map(e => {
  return {
    date: e.date, 
    entry_type: 'rating',
    entry:  e.rating_data
  }
})

const insertEntries = () => {
  ratingEntriesToEnter.forEach((e) => {
    db.query(`INSERT INTO entry (date, entry_type, entry) VALUES ($1, $2, $3) RETURNING date, entry_type;`, [e.date, e.entry_type, e.entry])
  })

  journalEntriesToEnter.forEach((e) => {
    db.query(`INSERT INTO entry (date, entry_type, entry) VALUES ($1, $2, $3) RETURNING date, entry_type;`, [e.date, e.entry_type, e.entry])
  })
}

// insertEntries()

// update dates
const updateDates = () => {
  db.query(`UPDATE entry SET date = '2021-07-13' WHERE date = 'Tuesday July 13th 2021';`)
  db.query(`UPDATE entry SET date = '2021-07-15' WHERE date = 'Thursday July 15th 2021';`)
  db.query(`UPDATE entry SET date = '2021-07-14' WHERE date = 'Wednesday July 14th 2021';`)
}

// updateDates()

const logDb = async () => {
  const entries = await db.query(`SELECT date, entry_type FROM entry;`)
  console.log(entries.rows)
}

// logDb()

// date, entry_type, entry

// Queries for updating dates
// UPDATE entry SET date = '2021-07-13' WHERE date = 'Tuesday July 13th 2021';
// UPDATE entry SET date = '2021-07-15' WHERE date = 'Thursday July 15th 2021';
// UPDATE entry SET date = '2021-07-14' WHERE date = 'Wednesday July 14th 2021';

// And to check the updates: 
// SELECT date, entry_type from entry;