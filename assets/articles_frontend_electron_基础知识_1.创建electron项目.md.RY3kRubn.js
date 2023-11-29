import{_ as e,o as n,c as t,R as r}from"./chunks/framework.ka86hsJC.js";const v=JSON.parse('{"title":"安装依赖","description":"","frontmatter":{},"headers":[],"relativePath":"articles/frontend/electron/基础知识/1.创建electron项目.md","filePath":"articles/frontend/electron/基础知识/1.创建electron项目.md","lastUpdated":1701224209000}'),o={name:"articles/frontend/electron/基础知识/1.创建electron项目.md"},i=r(`<p>Electron是一个跨平台的桌面应用程序开发框架，它允许开发人员使用Web技术（如HTML、CSS和JavaScript）构建桌面应用程序，这些应用程序可以在Windows、macOS和Linux等操作系统上运行。 Electron的核心是Chromium浏览器内核和Node.js运行时环境。Chromium内核提供了现代浏览器的功能，例如HTML5和CSS3支持，JavaScript引擎等，而Node.js运行时环境则提供了服务器端JavaScript的能力和模块系统，这使得开发人员可以使用Node.js的模块和工具来构建桌面应用程序。 Electron 案例</p><p>Visual Studio Code：由Microsoft开发的跨平台代码编辑器，支持多种编程语言和插件扩展。使用Electron和TypeScript构建。 Atom：由GitHub开发的跨平台代码编辑器，支持多种编程语言和插件扩展。使用Electron和CoffeeScript构建。 Postman：由Postman Inc.开发的API测试和开发工具，允许用户轻松地测试和调试REST API。使用Electron和React构建。</p><p>创建项目 dev shell复制代码# 创建Vue项目 npm init vue</p><h1 id="安装依赖" tabindex="-1">安装依赖 <a class="header-anchor" href="#安装依赖" aria-label="Permalink to &quot;安装依赖&quot;">​</a></h1><p>npm install</p><h1 id="一定要安装成开发依赖" tabindex="-1">一定要安装成开发依赖 <a class="header-anchor" href="#一定要安装成开发依赖" aria-label="Permalink to &quot;一定要安装成开发依赖&quot;">​</a></h1><p>npm install electron electron-builder -D</p><h1 id="安装超时-请使用某宝镜像-或者xx上网" tabindex="-1">安装超时 请使用某宝镜像 或者XX上网 <a class="header-anchor" href="#安装超时-请使用某宝镜像-或者xx上网" aria-label="Permalink to &quot;安装超时 请使用某宝镜像 或者XX上网&quot;">​</a></h1><p>npm config set electron_mirror=<a href="https://registry.npmmirror.com/-/binary/electron/" target="_blank" rel="noreferrer">https://registry.npmmirror.com/-/binary/electron/</a></p><p>开发环境启动electron 我们希望npm run dev的时候直接把electron也启动起来而不是开两个启动一次vite再启动一次electron 第一步我们需要先建立一个文件夹 在根目录创建一个plugins编写vite插件帮我们启动electron</p><p>plugins</p><p>vite.electron.dev.ts //编写electron开发模式 vite.electron.build.ts //打包electron项目</p><p>index.html src</p><p>main.ts App.vue background.ts //手动创建文件用于编写electron</p><p>package.json tsconfig.json vite.config.ts</p><p>background.ts ts复制代码import { app, BrowserWindow } from &#39;electron&#39;</p><p>// 等待Electron应用就绪后创建BrowserWindow窗口 app.whenReady().then(async () =&gt; { const win = await new BrowserWindow({ width: 800, height: 600,</p><pre><code>    // 配置窗口的WebPreferences选项，用于控制渲染进程的行为
    webPreferences: {
        nodeIntegration: true, // 启用Node.js集成
        contextIsolation: false, // 禁用上下文隔离
        webSecurity: false, // 禁用web安全策略
    }
})

// 根据命令行参数加载URL或本地文件
if (process.argv[2]) {
    win.loadURL(process.argv[2])
} else {
    win.loadFile(&#39;index.html&#39;)
}
</code></pre><p>})</p><p>这段代码创建了一个Electron应用程序的入口文件。该文件使用了Electron的app和BrowserWindow模块来创建一个窗口。在应用程序准备就绪后，它会创建一个新的BrowserWindow对象，并将其设置为800x600像素的大小。窗口的webPreferences选项用于配置渲染进程的行为，例如启用Node.js集成、禁用上下文隔离和web安全策略等。 接着，该代码检查命令行参数，如果有参数则加载URL，否则加载本地文件index.html。在开发模式下，可以将URL指向本地的开发服务器，以便实现热更新和实时调试。在生产模式下，需要将URL指向本地的index.html文件，以便在本地运行Electron应用程序。 在这段代码中，app.whenReady()函数用于在Electron应用程序准备就绪后执行回调函数。该函数返回一个Promise对象，可以使用async/await语法来等待应用程序就绪后执行其他操作。在这个例子中，我们使用await关键字来等待BrowserWindow对象的创建完成。 vite.electron.dev.ts ts复制代码// 导入需要使用的类型和库 import type { Plugin } from &#39;vite&#39; import type { AddressInfo } from &#39;net&#39; import { spawn } from &#39;child_process&#39; import fs from &#39;fs&#39;</p><p>// 导出Vite插件函数 export const viteElectronDev = (): Plugin =&gt; { return { name: &#39;vite-electron-dev&#39;, // 在configureServer中实现插件的逻辑 configureServer(server) { // 定义初始化Electron的函数 const initElectron = () =&gt; { // 使用esbuild编译TypeScript代码为JavaScript require(&#39;esbuild&#39;).buildSync({ entryPoints: [&#39;src/background.ts&#39;], bundle: true, outfile: &#39;dist/background.js&#39;, platform: &#39;node&#39;, target: &#39;node12&#39;, external: [&#39;electron&#39;] }) }</p><pre><code>        // 调用初始化Electron函数
        initElectron()

        // 监听Vite的HTTP服务器的listening事件
        server?.httpServer?.once(&#39;listening&#39;, () =&gt; {
            // 获取HTTP服务器的监听地址和端口号
            const addressInfo = server?.httpServer?.address() as AddressInfo
            const IP = \`http://localhost:\${addressInfo.port}\`
            // 启动Electron进程
            let electronProcess = spawn(require(&#39;electron&#39;), [&#39;dist/background.js&#39;, IP])

            // 监听主进程代码的更改
            fs.watchFile(&#39;src/background.ts&#39;, () =&gt; {
                // 杀死当前的Electron进程
                electronProcess.kill()
                // 重新编译主进程代码并重新启动Electron进程
                initElectron()
                electronProcess = spawn(require(&#39;electron&#39;), [&#39;dist/background.js&#39;, IP])
            })

            // 监听Electron进程的stdout输出
            electronProcess.stdout?.on(&#39;data&#39;, (data) =&gt; {
                console.log(\`日志: \${data}\`);
            });
        })
    }
}
</code></pre><p>}</p><p>configureServer是Vite的一个插件钩子函数，用于在Vite开发服务器启动时执行一些自定义逻辑。该函数接受一个ServerOptions对象作为参数，该对象包含有关当前Vite服务器的配置信息。在这个钩子函数中，您可以访问Vite服务器的HTTP服务器对象（httpServer），WebSocket服务器对象（wsServer）和Vite的构建配置对象（config）等。您可以使用这些对象来实现各种功能，例如自定义路由、添加中间件、实现实时重载和调试等。 esbuild.buildSync()</p><p>entryPoints：指定要编译的入口文件，这里是src/background.ts。 bundle：指定是否打包所有依赖项，这里是true，表示需要打包所有依赖项。 outfile：指定输出文件的路径和名称，这里是dist/background.js。 platform：指定编译的目标平台，这里是node，表示编译为Node.js可用的代码。 target：指定编译的目标JavaScript版本，这里是node12，表示编译为Node.js 12及以上版本可用的代码。 external：指定不需要被打包的外部依赖项，这里是[&#39;electron&#39;]，表示electron模块不需要被打包。</p><p>在这段代码中，esbuild会将src/background.ts文件编译为JavaScript 并且放入dist fs.watch 主要实现热更新 每次background.ts 修改完成就会重新启动electron进程</p><p>vite.electron.build.ts ts复制代码import type { Plugin } from &#39;vite&#39; import * as electronBuilder from &#39;electron-builder&#39; import path from &#39;path&#39; import fs from &#39;fs&#39;</p><p>// 导出Vite插件函数 export const viteElectronBuild = (): Plugin =&gt; { return { name: &#39;vite-electron-build&#39;,</p><pre><code>    // closeBundle是Vite的一个插件钩子函数，用于在Vite构建完成后执行一些自定义逻辑。
    closeBundle() {

        // 定义初始化Electron的函数
        const initElectron = () =&gt; {
            // 使用esbuild编译TypeScript代码为JavaScript
            require(&#39;esbuild&#39;).buildSync({
                entryPoints: [&#39;src/background.ts&#39;],
                bundle: true,
                outfile: &#39;dist/background.js&#39;,
                platform: &#39;node&#39;,
                target: &#39;node12&#39;,
                external: [&#39;electron&#39;],
            })
        }

        // 调用初始化Electron函数
        initElectron()

        // 修改package.json文件的main字段 不然会打包失败
        const json =  JSON.parse(fs.readFileSync(&#39;package.json&#39;, &#39;utf-8&#39;)) 
        json.main = &#39;background.js&#39;
        fs.writeSync(fs.openSync(&#39;dist/package.json&#39;, &#39;w&#39;), JSON.stringify(json, null, 2))

        // 创建一个空的node_modules目录 不然会打包失败
        fs.mkdirSync(path.join(process.cwd(), &quot;dist/node_modules&quot;));

        // 使用electron-builder打包Electron应用程序
        electronBuilder.build({
            config: {
                appId: &#39;com.example.app&#39;,
                productName: &#39;vite-electron&#39;,
                directories: {
                    output: path.join(process.cwd(), &quot;release&quot;), //输出目录
                    app: path.join(process.cwd(), &quot;dist&quot;), //app目录
                },
                asar: true,
                nsis: {
                    oneClick: false, //取消一键安装
                }
            }
        })
    }
}
</code></pre><p>}</p><p>打包主要依靠electron-builder 这个库 他的参数是有很多的这儿只是简单演示 closeBundle 我们electron打包是需要index.html 所以我们先等vite打完包之后vite会自动调用这个钩子 然后在这个钩子里面打包electron vite.config.ts ts复制代码import { fileURLToPath, URL } from &#39;node:url&#39;</p><p>import { defineConfig } from &#39;vite&#39; import vue from &#39;@vitejs/plugin-vue&#39; import {viteElectronDev} from &#39;./plugins/vite.electron.dev&#39; import {viteElectronBuild} from &#39;./plugins/vite.electron.build&#39; // <a href="https://vitejs.dev/config/" target="_blank" rel="noreferrer">https://vitejs.dev/config/</a> export default defineConfig({ plugins: [ vue(), viteElectronDev(), viteElectronBuild() ], base:&#39;./&#39;, //默认绝对路径改为相对路径 否则打包白屏 resolve: { alias: { &#39;@&#39;: fileURLToPath(new URL(&#39;./src&#39;, import.meta.url)) } } })</p>`,32),s=[i];function c(l,a,p,d,u,f){return n(),t("div",null,s)}const g=e(o,[["render",c]]);export{v as __pageData,g as default};
