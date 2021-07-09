const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Day = new Schema(
  {
    suicideUrge: String,
    selfHarmUrge: { type: String, required: true },
    drugUrge: { type: String, required: true },
    emotionalMisery: { type: String, required: true },
    physicalMisery: { type: String, required: true },
    joy: { type: String, required: true },
    gratitude: String,
    calm: String,
    intentionality: String,
    date: String,
  }, { timestamps: true}
)

module.exports = mongoose.model('days', Day)