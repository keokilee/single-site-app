const proc = require('child_process');

const tasks = [
  proc.fork('./scripts/dev_app'),
  proc.fork('./scripts/dev_server')
];

process.on('exit', code => tasks.forEach(task => task.kill(code)));
