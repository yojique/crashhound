#! /usr/bin/env node --harmony

"use strict";

let _         = require('underscore');
let assert    = require('assert');
let co        = require('co');
let commander = require('commander');

let CrashLog = require('./lib/CrashLog');


let crashlog;

commander
  .version('1.0.0')
  .usage('[options] <crashlog>')
  .arguments('<crashlog>')
  .action(function (crashlog_path) {
    crashlog = new CrashLog(crashlog_path);
  })
  .parse(process.argv);

if (_.isEmpty(crashlog)) {
  commander.help();
}

co(function * () {

  try {
    assert(crashlog.originalResolve(),          "Couldn't find crash log file.");
    assert(crashlog.originalSizeLimit(),        "File specified is to large to be crash log.");
    assert(yield crashlog.originalReadLines(),  "Couldn't read crash log file.");
  } catch (e) {
    if (_.has(e, 'message')) {
      e = e.message;
    }

    console.log(e);
  }

  console.log(crashlog);

});

