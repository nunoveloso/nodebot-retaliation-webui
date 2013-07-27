
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , config = {
      hostname : '0.0.0.0',
      port : 3000,
      driver_url : 'http://127.0.0.1:3001',
    }
  , config_path = './config.json'


var app = express()

app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'ejs')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.cookieParser('your secret here'))
  app.use(express.session())
  app.use(app.router)
  app.use(express.static(path.join(__dirname, 'public')))
})

app.configure('development', function() {
  app.use(express.errorHandler())
})


app.get('/', routes.index)


/**
 * Create server.
 */
fs.exists(config_path, function(exists) {
  // load any additional or overriding config
  if (exists) {
    var config_json = require('./config.json')
    for (var c in config_json) {
      config[c] = config_json[c]
    }
    console.log("Config loaded: " + JSON.stringify(config))
  }

  // starts the http server
  http.createServer(app).listen(config.port, config.hostname, function(){
    console.log("Server listening on port " + config.port)
  })
})

