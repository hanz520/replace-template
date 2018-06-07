const path = require('path');
const fs = require('fs');
const config = require('./config');
const dirHandler = require('./dir-handler');

if(!fs.existsSync(config.outPutPath)) {
  fs.mkdirSync(config.outPutPath)
}

dirHandler(config.webPath)
