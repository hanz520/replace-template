const fs = require('fs');
const path = require('path');
const config = require('./config');

let buf = new Buffer(100000);

let fileHandler = function(file) {
  
  let outPutPath = file.replace('\\web\\', '\\web-output\\')
  if(!fs.exists(outPutPath)) {
    fs.createWriteStream(outPutPath)
  }

  // 打开源文件
  fs.open(file, 'r', function(err, res) {
    if(err) {
      return console.log(err)
    }
    // 读取源文件
    fs.read(res, buf, 0, buf.length, 0, function(err, bytes){
      if(err) {
        return console.log(err)
      }
      // 获取源文件内容修改文件内容
      let content = buf.slice(0, bytes).toString()
      
      // 修改后的内容
      let newContent
      new Promise(function(resolve, reject) {
        newContent = modifyContent(content)
        console.log(newContent)
        resolve()
      }).then(function() {
        // 写入新文件
        fs.open(outPutPath, 'rs+', function(err, res) {
          if(err) {
            return console.log(err)
          }
          fs.writeFile(res, newContent, function(err, res) {
            if(err) {
              return console.log(err)
            }
            console.log('写入文件成功：' + file)
          })
        })
      }).catch(function() {

      })
   });
  })
}

function modifyContent(content) {
 



  for(let i in config.replaceReg) {
    let tplBuf = new Buffer(100000);
    let replaceObj = config.replaceReg[i]
    let tplPath = path.resolve(config.tplPath, replaceObj.tplName)    // 当前替换模板的路径
    // 打开模板文件
    fs.open(tplPath, 'r', function(err, res) {
      if(err) {
        return console.log(err)
      }
      fs.read(res, tplBuf, 0, tplBuf.length, 0, function(err, bytes){
        if(err) {
          return console.log(err)
        }
        let tplContent = tplBuf.slice(0, bytes).toString()   // 模板中的内容
        content = content.replace(replaceObj.test, tplContent)
        if(i == 1) 
          return content
      })      
    }) 
  }   
}

module.exports = fileHandler