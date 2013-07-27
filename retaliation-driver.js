/**
 * @file
 * This is a HTTP server to wrap the Retaliation python script.
 *
 * @author Nuno Veloso (nuno@marzeelabs.org)
 * @author Peter Vanhee (peter@marzeelabs.org)
 */


/**
 * Module dependencies.
 */
var http = require('http')
  , util  = require('util')
  , spawn = require('child_process').spawn
  , config = {
      hostname : '0.0.0.0',
      port : 3001
    }


/**
 * Does the actual job: reads and execute the command.
 * @param req node [Object]
 * @param res node [Object]
 */
function retaliation_entry_point(req, res) {
  var command = req.url.replace(/^\//, '').split('/')
  command = '/usr/local/bin/python lib/Retaliation/retaliation.py ' + command.join(' ')
  spawn_exec(command)
  console.log('Executed the command: ' + command)
  res.write('Done.')
  res.end()
}


/**
 * Executes a command and executes `state`.
 * @param state [Function]
 * @param command [String]
 */
function spawn_exec(command) {
  command = command.split(' ')
  var bin = command.shift()
  // executes the command
  var exec_spawn = spawn(bin, command)
  // register handlers
  spawn_handlers(exec_spawn)
  // when it finishes executing
  exec_spawn.on('exit', function(code) {
    spawn_exit_message(bin, command, code)
  })
}

/**
 * Attach handlers to spawn object.
 * @param spawn [Object]
 */
function spawn_handlers(exec_spawn) {
  // register handler to print stdout
  exec_spawn.stdout.on('data', function(data) {
    console.log('' + data)
  })

  // register handler to print stderr
  exec_spawn.stderr.on('data', function (data) {
    console.log('ERROR: ' + data);
  })
}


/**
 * Sends exit message to the console.
 * @param bin [String] - 1st arg of spawn
 * @param command [Array] - 2nd arg of spawn
 * @param code [Number]
 */
function spawn_exit_message(bin, command, code) {
  command = bin + ' ' + command.join(' ')
  console.log('Execution of `' + command + '` terminated (' + code + ')')
}


// starts the http server
http.createServer(retaliation_entry_point).listen(config.port, config.hostname, function(){
  console.log("Server listening on port " + config.port)
})
