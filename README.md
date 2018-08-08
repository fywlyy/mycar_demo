**JEST 配置中的坑点**

一，步骤

    1.1 安装 npm install jest enzyme --save-dev
        注释：jest 为测试运行环境，enzyme为类jquery操作API
        
    1.2 配置package.json jest
    
        "jest": {
         "verbose": true,
         "testURL": "http://localhost",
         "moduleFileExtensions": [
           "js",
           "jsx"
         ],
         "moduleNameMapper": {
           "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
           ".*\\.(css|less|scss)$": "<rootDir>/__mock__/stub.css"
         },
         "transform": {
           "^.+\\.jsx?$": "babel-jest"
         }
        } `  
    
    
    1.3 配置package.json 中的测试script
    
        "scripts": {
            "start": "http-server & webpack -w --config webpack.pro.js",
            "pro": "webpack -p --config webpack.pro.js --progress",
            "hot": "node server_hot.js",
            "test": "jest" 
          },
          
二、测试demo，见__test__下以spec.js或test.js结尾的文件


三、运行测试
    npm run test //基于package.json
    
四、坑点

    4.1 如果照抄网上demo，第一个遇到的问题是 localstorage 没有权限
        SecurityError: localStorage is not available for opaque origins
        
        问题原因：因为运行的测试案例无法知道要去那个浏览器的域名下检测；
        解决办法：在package.json 下的jest中配置 "testURL": "http://localhost",
    
    
    4.2 第二个问题是 import jsx文件 错误
        ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import React, { Component } from 'react';                                                                                      ^^^^^^
        SyntaxError: Unexpected token import
    
        问题原因：jest检测的时候默认检测文件未配置
        解决办法：在package.json 下的jest.transform中配置(jsx?正则)   "^.+\\.jsx?$": "babel-jest"
    
    
    4.3 第三个问题是 css class 报错，如下
        ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){.button {                                                                            ^
        SyntaxError: Unexpected token .
        
        问题原因：无
        解决办法：设置一个空文件，里面放一个空css, 并在jest 的moduleNameMapper下配置
             ".*\\.(css|less|scss)$": "<rootDir>/__mock__/stub.css"
             
 五、字段解释
 
    5.1 verbose 细节展示
    5.2 testURL 测试域名
    5.3 moduleFileExtensions 类似webapck resolve，简写后缀
    5.4 moduleNameMapper mock数据路径
    5.5 transform 要把那些文件用babel-jest转化成es6\es7的标准javascript
    
    
**.babelrc**

    babel-loader插件比较多，写在webpack.config.js 的rule中太多太乱，不如单独取出来配置
    
    
**eslint**
    
    1. 配置风格： .eslintrc 中 extends字段，前提必须下载了该标准库，如"eslint-config-airbnb"；
    2. 嵌入eslint： 在webpack.config.js中 设置js|jsx 的loader "eslint-loader"；
    3. 单独设置某个检测点：在.eslintrc 中 配置不需要的检测为"0"，如"camelcase： 0" 即表示跳过驼峰检测；
    4. 代码内设置检测点：设置/* eslint camelcase: 0 */, 将不对以下代码做该项规范检测，如下
        /* eslint camelcase: 0 */
        const myname = 'Chou'
       
        
**postcss**
    
    1. postcss.config.js 从webpack.config.js 中单独提取，类似 .babelrc
    2. autoprefix, 自动添加css3前缀
    3. postcss-sprite, 自动合并图片（要求css严格按照切图编写，不实用）
    
        
**ICONFONT**

    http://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=777161
    
    
**Webpack4配置中的坑点**

    1. ExtractTextPlugin （用于提取css）插件不能用了，用MiniCssExtractPlugin 代替
    2. HtmlWebpackPlugin 需要升级一下
    3. 热加载的组件react-hot-loader不能喝react16混用，只能降级到react15
    4. 各种热加载顺序：
        4.1 react-hot-loader 必须写在所有jsx? loader之前 （否则热加载js无效）
        4.2 style-loader 必须写在所有s?css loader之前 （否在代码报错）
        4.3 css-hot-loader 必须写在第二个s？css loader处 （否则热加载css无效）