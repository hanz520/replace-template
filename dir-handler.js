const fs = require('fs');
const path = require('path');
const fileHandler = require('./file-handler');
const config = require('./config');

let dirHandler = function(dirName) {
  // 判断输出  是否有该目录，如果没有就新建
  let outPutPath = dirName.replace('\\web\\', '\\web-output\\')
  if(!fs.existsSync(outPutPath)) {
    fs.mkdirSync(outPutPath)
  }
  
  fs.readdir(dirName, function(err, res){
    if(!res.length) {
      return console.log(config.webPath + '下没有子目录或文件');
    }
    // console.log(res)
    for(var i=0; i<res.length; i++) {
      let file = path.resolve(dirName, res[i]);    

      fs.stat(file, function(err, res) {
        if(res.isDirectory()) {   // 子目录
          dirHandler(file)
        }else{    // 子文件
          fileHandler(file)
        }
      })
    }
  })
}

module.exports = dirHandler

