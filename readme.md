## 模板文件替换工具

鉴于使用nginx的 include 嵌套模板写了一个静态网站，领导需要拿去别的地方做演示，又不想装nginx环境。特此写了这个一个简单的nodejs程序批量替换掉所有的页面模板，demo奉上

config配置
  - `webPath` 放置所有的静态页面
  - `tplPath` 放置所有的html模板
  - `outPutPath` 替换后输出的路径，会根据webPath下的路径生成相应的文件夹，demo中page1，page2，page3都会在`outPutPath`以相应的层级目录生成
  - `replaceReg`  需要在html文件中替换掉的模板标签。
  demo中如：`<!--#include file="../tpl/header.html"-->`。可以根据个人需求自己写正则表达式

  警告：最好不要修改上面三个路径的值，不然需要去将`dir-handler.js`和`file-handler.js`中的`web`和`web-output`相应的替换成你的文件目录名

  

运行
```
npm run change
```

demo已经生成了web-output目录，你可以删除掉改目录运行一遍，看一下效果。