# vue-prerender快速创建项目
## 全局安装/查看版本
```
npm install -g @vue/cli 或 yarn global add @vue/cli
vue -V
```

## 创建项目
```
vue create my-project

vuecli3是因为上一次记录过的cli3配置，第一次执行create是没有的
选择默认（default）还是手动（Manually），如果选择default，一路回车执行下去就行了

选择配置，看个人项目需求
注意，空格键是选中与取消，A键是全选
TypeScript 支持使用 TypeScript 书写源码
Progressive Web App (PWA) Support PWA 支持。
Router 支持 vue-router 。
Vuex 支持 vuex 。
CSS Pre-processors 支持 CSS 预处理器。
Linter / Formatter 支持代码风格检查和格式化。
Unit Testing 支持单元测试。
E2E Testing 支持 E2E 测试。


配置文件存放地方
第一个是独立文件夹位置，第二个是在package.json文件里

询问是否记录这一次的配置，以便下次使用，如一开始的时候会显示的vuecli3配置

回车确定等待下载
```

## 启动
```
cd my-project // 进入到项目根目录
npm run serve // 启动项目

```
## 配置页面预渲染
```
1、在项目中安装prerender-spa-plugin
npm install --save prerender-spa-plugi

2、conf.js文件
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

new PrerenderSPAPlugin({
// 生成文件的路径，也可以与webpakc打包的一致。
// 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
staticDir: path.join(__dirname, '../dist'),

//对应自己的路由文件，比如index有参数，就需要写成 /index/param1。
routes: ['/', '/find', '/order', ],

// 这个很重要，如果没有配置这段，也不会进行预编译
renderer: new Renderer({
		inject: {},
		// 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
		renderAfterDocumentEvent: 'render-event',
		args: ['--no-sandbox', '--disable-setuid-sandbox']
})

3、index.js，在const router = new Router({ })中写入
mode:'history',

4、修改main.js入口文件
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // 添加mounted，不然不会执行预编译
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
})
```
## 管理你的 app 里面的 meta 信息
```
npm install vue-meta-info --save

全局引入vue-meta-info
import Vue from 'vue'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)


组件内静态使用 metaInfo
<template>
  ...
</template>

<script>
  export default {
    metaInfo: {
      title: 'My Example App', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'My Example App'
      }]
      link: [{                 // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }]
    }
  }
</script>

```

## 遇到的问题
```
Error: Chromium revision is not downloaded. Run "npm install" or "yarn install"
at Launcher.launch (/Users/admin/Desktop/vue-meituan/node_modules/puppeteer/lib/Launcher.js:115:15)
[Prerenderer - PuppeteerRenderer] Unable to start Puppeteer

使用淘宝镜像，下载puppeteer，可以代理下载 Chromium r526987
cnpm install puppeteer

```
## vue 优化
```
一.代码包优化
屏蔽sourceMap
vue.config.js
productionSourceMap: false,
webpack 
devtool: 'none',
devtool: 'source-map',inline-source-map 

对项目代码中的JS/CSS/SVG(*.ico)文件进行gzip压缩
1、安装compression-webpack-plugin
npm i compression-webpack-plugin
2、vue.config.js
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    configureWebpack: config => {
         if (process.env.NODE_ENV === 'production') {
      productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          threshold: 1024,
          minRatio: 0.8
        })
      )
  }


    }

}
3、后台Nginx配置
gzip on;
gzip_static on;
gzip_min_length 1024;
gzip_buffers 4 16k;
gzip_comp_level 2;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
gzip_vary off;
gzip_disable "MSIE [1-6]\.";

对路由组件进行懒加载
component: resolve=>require(["@/components/employees"],resolve)


二、源码优化
v-if 和 v-show选择调用
为item设置唯一key值,方便vuejs内部机制精准找到该条列表数据
细分vuejs组件
减少watch的数据,可以采用事件中央总线或者vuex进行数据的变更操作
内容类系统的图片资源按需加载
SSR(服务端渲染)

三、用户体验优化
better-click防止iphone点击延迟
菊花loading
骨架屏加载
```

