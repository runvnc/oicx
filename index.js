"use strict";
var co = require('co');
var fs = require('mz/fs');

var plugins = {};
process.plugins = plugins;

function* install(plugin) {
  yield spawn('npm',['install','plugin']); //cwd
  let plug = require('oic-'+plugin);
}

co(function* () {
  let fname = __dirname+'/plugins';
  if (yield fs.exists(fname)) {
    var list = yield fs.readFile(fname,'utf8');
  } else {
    var list = 'base';
    yield fs.writeFile(fname, list);
    yield install('base');
  }
  list = list.split('\n');

  for (let dep of list) {
    console.log(3);
    let plugin = require('oic-'+dep);
    plugins[dep] = plugin;
    yield plugin.loaded();
  }

}).catch(function(e) {
  console.log("Problem:",e);
});



