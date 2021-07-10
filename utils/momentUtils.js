const moment = require('moment')

const getWeekday = () => moment().format('dddd')  
const getFormattedDate = () => moment().format('LL')
const getId = () => Date.now();

const getDate = () => moment().format('dddd MMMM Do YYYY');

module.exports = {
  id: getId(),
  weekday: getWeekday(),
  date: getDate()
}