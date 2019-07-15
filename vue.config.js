const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
  // 基本路径
  baseUrl: '/',
  // 输出文件目录
  outputDir: 'dist',
  // webpack-dev-server 相关配置
  devServer: {
    port: 8080,
		open: true,
  },
	configureWebpack:()=>{
		if (process.env.NODE_ENV !== 'production') return;
		return {
			plugins:[
				new PrerenderSPAPlugin({
					staticDir:path.join(__dirname, './dist'),
					routes:['/','/about'],
					renderer:new Renderer({
							renderAfterTime: 10000,
							headless: false,
							// 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
							renderAfterDocumentEvent: 'render-event',
							args: ['--no-sandbox', '--disable-setuid-sandbox']
					})
				})
			]
		}
  }
}