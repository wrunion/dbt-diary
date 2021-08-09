module.exports = (req, res, next) => {
  res.setHeader('X-Clacks-Overhead', 'GNU Terry Pratchett')
  next()
}