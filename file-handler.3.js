const fs = require('fs');
const path = require('path');
const config = require('./config');

let buf = new Buffer(10000000);
var outputPath

let fileHandler = function(file) {
  
  let outputPath = file.replace('\\API\\', '\\web-output\\')
  
  // 创建新文件
  if(!fs.exists(outputPath)) {
    fs.writeFile(outputPath, "", function(err) {
      if(err) {
          return console.log(err);
      }
    });
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
      let data = buf.slice(0, bytes).toString()
      
      // 修改源文件内容
      replaceFn(data, 0, function(newData) {
        // 写入新文件
        writeNew(newData, outputPath)
      })
   });
  })
}

// 替换内容的方法
function replaceFn(data, num ,fn) {
  let getData = data
  let getNum = num
  if(getNum >= config.replaceReg.length) {
    fn(data)
    return
  }
  let tplBuf = new Buffer(10000000);
  let replaceObj = config.replaceReg[getNum]
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
      getData = getData.replace(replaceObj.test, tplContent)    // 修改内容关键代码
      getNum++
      replaceFn(getData, getNum, fn)      
    })      
  }) 
}

// 写入新文件的方法
function writeNew(data, outputPath) {
  console.log(/<\/html>/.test(data))
  fs.open(outputPath, 'rs+', function(err, res) {
    if(err) {
      return console.log(err)
    }
    fs.writeFile(res, data, function(err, res) {
      if(err) {
        return console.log(err)
      }
      // console.log('写入文件成功：' + file)
    })
  })
}

module.exports = fileHandler
