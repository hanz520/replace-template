const path = require('path');

module.exports = {
  webPath: path.resolve(__dirname, 'web/pages'),    // 站点页面目录
  tplPath: path.resolve(__dirname, 'web/tpl'),     // 模板目录
  outPutPath: path.resolve(__dirname, 'web-output'),   // 批量替换输出目录
  replaceReg: [    // 正则匹配需要替换的标签
    {
      test: /<!--#\s*include\s*file=".*header.html"\s*-->/g,
      tplName: 'header.html'
    },
    {
      test: /<!--#\s*include\s*file=".*footer.html"\s*-->/g,
      tplName: 'footer.html'
    }
  ]
}

