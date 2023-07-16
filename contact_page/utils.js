function wasResponseSent(res) {
  return res.headersSent;
}

module.exports = wasResponseSent;
