## 为啥有这个文件
本教程是基于之前的《Vue+Webpack打造todo应用》教程基础上的

## 4-1 css单独分离打包

为什么webpack loaders中，没有css-loader, 因为没有css文件  
stylus 文件也是，stylus-loader, 开发环境和正式环境不一样，

开发环境有 stylus-loader  
正式环境，配置就不一样了，


prod用于生产打包，dev用于开发打包，可以想象，prod和dev肯定有一部分配置相同，再加上一些不同的配置。所以相同的配置都放到base里面去，然后prod和dev再引入base，增加各自不同的细节。



## 4-2

 name: 'vendor',  
 minChunks
  
 没怎么听懂




## 2-1

const path = require('path')

path是node.js的一个基本包

```
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
```
__dirname代表这个文件所在的目录，它的地址，  
path.join 这个路径和后面的路径拼接起来，形成绝对路径   


## 2-2

url-loader  
options的配置：

```
	options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
```

图片转换成base64代码,直接写在js内容里面，而不是重新生成一个新的文件，减少http请求



## 2-3

本机内网ip，别人的电脑上也可以访问，或者手机也可以访问


```
//编译的js和图片，放到页面中
new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    
    
//   webpack.dev.conf.js 
new webpack.DefinePlugin({
  'process.env': require('../config/dev.env')
}), 
//开发环境
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
//生产环境
module.exports = {
  NODE_ENV: '"production"'
}

 
   
 //视频中：  
'process.env': {
		'Node_ENV': isDev ? 'development' : 'production'
}
    
```













