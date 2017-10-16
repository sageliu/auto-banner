# auto-banner

> A Vue.js project for create a new lp.html

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

###关于项目结构的介绍
```
autoBanner
    |--.babelrc     用来设置 转码的规则和插件的格式
    |--.gitignore   用来设置文件不上传的规则
    |--index.html   项目的入口html文件     ---需要配置meta等内容
    |--package.json 项目的包管理   执行 npm i 安装项目中所需要依赖的包
    |--package-lock.json    锁定安装依赖包的版本，不管在开发过程中依赖的包是否出现了新版本
    |--server.js    后台服务器，端口9001
    |--webpack.config.js    webpack的配置文件
    |--dist         输出文件的存放路径
        |--views    最终输出的banner文件的存放路径
            |--lp.html  最终输出的banner文件
        |--data     与输出文件相关的数据文件的存放路径
            |--req.txt  与输出文件相关的数据文件(lp.html文件的配置信息)
    |--node_modules 依赖包的安装路径
    |--src  实际开发文件的存放路径
        |--main.js      vue项目的入口文件
        |--App.vue      main.js render的入口文件
        |--components   组件路径
        
        |--router       路由文件
            |--index.js router,需要传进使用router进行路由功能的vm实例中(.vue文件中)
            |--routes   路由列表存放路径
                |--index.js 合并后的路由文件
                |-- 
               
        |--vuex         vuex文件存放的路径
            |--store.js store,需要传进使用store进行状态管理的vm实例中(.vue文件中)
            |--state    存放state状态的文件夹
                |--index.js 合并后的state文件
                |--
            |--getters
            |--mutations
            |--actions
        |--         
```

###建议
> 异步请求请使用axios
- 文档 ：https://www.kancloud.cn/yunye/axios/234845
```
import axios from 'axios'
//axios不能被Vue.use,因为axios没有提供install这个methods

axios.post('/user', context.state.test02)//示例，get方法没有第二个参数(请求体)
.then(function(res){//成功之后的回调
  console.log(res)
})
.catch(function(err){//失败之后的回调
  console.log(err)
})

``` 