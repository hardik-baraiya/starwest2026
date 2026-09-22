function healthcheck(req, res) {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
}

module.exports = { healthcheck };
