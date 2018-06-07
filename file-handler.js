const fs = require('fs');
const path = require('path');
const config = require('./config');

let fileHandler = function(file) {
  let outPutPath = file.replace('\\web\\', '\\web-output\\')
  let data = ''

  let readerStream = fs.createReadStream(file)
  readerStream.setEncoding('UTF8');

  readerStream.on('data', function(chunk) {
    data += chunk;
  });

  // 拿到源文件内容
  readerStream.on('end',function(){
    // 替换模板工作
    replaceFn(data, 0, function(newData) {
      // 写到新文件中
      writeNew(newData, outPutPath)    
    })
  });
  // 拿源文件失败
  readerStream.on('error', function(err){
      console.log(err.stack);
  });
}

function replaceFn(data, num, fn) {
  let getData = data
  let getNum = num
  if(getNum >= config.replaceReg.length) {
    fn(data)
    return
  }
  let replaceObj = config.replaceReg[getNum]
  
  let tplPath = path.resolve(config.tplPath, replaceObj.tplName)    // 当前替换模板的路径
  let tplDate = ''

  // 读取模板流
  let readerStream = fs.createReadStream(tplPath)
  readerStream.setEncoding('UTF8');

  readerStream.on('data', function(chunk) {
    tplDate += chunk;
  });

  // 获取到流的数据
  readerStream.on('end',function(){
    if(replaceObj.test.test(getData)) {
      getData = getData.replace(replaceObj.test, tplDate)
    }
    getNum++
    replaceFn(getData, getNum, fn)
  })

  // 拿模板文件失败
  readerStream.on('error', function(err){
    console.log(err.stack);
  });
}

function writeNew(data, outPutPath) {
  // console.log(/<\/html>/.test(data))
  let writerStream  = fs.createWriteStream(outPutPath)
  writerStream.write(data,'UTF8');
  writerStream.on('finish', function() {
    console.log("写入完成。");
  });
  writerStream.on('error', function(err){
    console.log(err.stack);
  });
}

module.exports = fileHandler
