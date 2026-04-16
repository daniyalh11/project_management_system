module.exports = (req, res, next) => {
  console.log({
    time: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
  next();
};