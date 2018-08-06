>开发之前请阅读以下内容
####[requireJs](http://www.requirejs.cn/)
1. 采用requireJs管理与加载js、css
2. 配置文件requireJs.config.js在requireJs之后引入
3. shim表示各js、css的依赖，paths之前会自动加上baseUrl
4. 采用绝对路径不会加上baseUrl
5. 在requireJs.config.js配置过后，引入时可使用定义的名称
6. 引入css之前加上css!，引入html、json之前加上text!
7. require、define具体使用方法参照页面例子

####[artTemplate](https://aui.github.io/art-template/)
1. 使用简洁语法版本{{}}
2. 支持循环、判断
3. 支持引入子模板{{include ''}}
4. 模版可在页面内也可在单独页面
5. compile、render方法具体使用方法参照页面例子

####项目结构
1. 项目根目录在content下
2. 每个页面下有data、js、template、images、css等子目录
3. 每个页面都有不同的关键字，目录下文件都以关键字开头，_下划线后以功能名称结束
4. common文件夹下为各页面公用文件

####数据结构
1. 分为ajax请求数据与本地静态数据，以$.extend(true,{static},{dynamic})结合
2. 本地静态数据作为默认状态
3. 每个页面都需定义关键字moduleName以区别id

####路由
1. 子页面各参数在/index/data/index_data.js配置
2. hash会记住浏览路径内容，支持前进后退
3. 导航、自导航、路径导航都根据hash路径参数配置联动
4. 如页面中需增加子页面，<a href="#路径？层级"></a>
5. 刷新为页面重新加载，但会重新进入当前页
