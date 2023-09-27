function logger(req, res, next) {
  const start = Date.now();

  next();

  const diff = Date.now() - start;

  console.log(`${req.method} ${req.url} took: ${diff}ms`);
}

module.exports = logger;
