
"use strict";

let _     = require('underscore');
let fs    = require('fs');
let lines = require('line-by-line-promise');
let path  = require('path');


class CrashLog {

  constructor (original_path) {
    this.originalPath = original_path;
  }


  * originalReadLines () {
    this.originalLines = [];

    let file = new lines(this.originalPath);
    let line;

    while((line = yield file.readLine()) !== null) {
      this.originalLines.push(line);
    }

    return !_.isEmpty(this.originalLines);
  }

  originalResolve () {
    let stats = this.originalStats();

    if (_.isEmpty(stats)) {
      this.originalPath = path.resolve(process.cwd(), this.originalPath);
      stats = this.originalStats();
    }

    return !_.isEmpty(stats);
  }

  originalSizeLimit () {
    let stats = this.originalStats();
    return (stats.size < 256 * 1024);
  }

  originalStats () {
    let stats;

    try {
      stats = fs.statSync(this.originalPath);
    } catch (e) {}

    return stats;
  }

}


exports = module.exports = CrashLog;

