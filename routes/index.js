
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Welcome to Nodebot Retaliation' })
}


exports.control = function(req, res) {
  res.render('control', { title: 'Nodebot Retaliation :: Control Room' })
}


exports.spectator = function(req, res) {
  res.render('spectator', { title: 'Nodebot Retaliation :: Spectator Room' })
}
