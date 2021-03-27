// look into the following 5 lines - looks promising! 
// https://blog.logrocket.com/implementing-a-secure-password-reset-in-node-js/
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});
plus the node module "express-async-errors"
