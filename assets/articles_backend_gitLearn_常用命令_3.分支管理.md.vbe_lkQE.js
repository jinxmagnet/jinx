import{_ as s,o as i,c as a,R as e}from"./chunks/framework.KB1hzIC4.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/backend/gitLearn/常用命令/3.分支管理.md","filePath":"articles/backend/gitLearn/常用命令/3.分支管理.md","lastUpdated":1701094652000}'),t={name:"articles/backend/gitLearn/常用命令/3.分支管理.md"},l=e(`<blockquote><p>分支用于为项目新增新功能或者修复bug时使用</p></blockquote><p>主分支默认名为<code>master</code>，我们现在习惯与将主分支命名为<code>main</code>，如何修改呢？</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在master分支下强制将分支名改为main，这里的-M也可以写成小写-m</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> branch</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -M</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> main</span></span></code></pre></div><p><img src="https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/image-20221214211430333.png" alt="image-20221214211430333"></p><h2 id="一、分支流程" tabindex="-1">一、分支流程 <a class="header-anchor" href="#一、分支流程" aria-label="Permalink to &quot;一、分支流程&quot;">​</a></h2><p>所有新功能和bug修复使用新建分支的方式来完成，这一点我经常忘记了，都是一股脑写，没有分支也没有提交记录，缺乏规范性，以后要按照这个模式来。</p><ol><li>新建支付功能开发分支</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> branch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pay</span></span></code></pre></div><ol start="2"><li>切换到新分支开始开发，这里的工作内容与上面的基础流程是一样的</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> checkout</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pay</span></span></code></pre></div><ol start="3"><li>开发完成执行提交</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> commit</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;H5 支付功能&#39;</span></span></code></pre></div><ol start="4"><li>合并分支到 main</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 切换到main分支</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> checkout</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 合并pay分支的代码,将pay分支代码合并到main分支</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> merge</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pay</span></span></code></pre></div><ol start="5"><li>提交代码到 master 远程分支</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> push</span></span></code></pre></div><h2 id="二、常用命令" tabindex="-1">二、常用命令 <a class="header-anchor" href="#二、常用命令" aria-label="Permalink to &quot;二、常用命令&quot;">​</a></h2><ol><li>创建分支 <code>git branch dev</code></li><li>查看分支 <code>git branch</code></li><li>切换分支 <code>git checkout dev</code></li><li>创建并切换分支 <code>git checkout -b feature/bbs</code></li><li>将分支 main 更新为 master <code>git branch -m main master</code></li><li>合并 dev 分支到 main <code>git merge dev</code></li><li>删除分支 <code>git branch -d dev</code></li><li>删除没有合并的分支<code>git branch -D dev</code></li><li>删除远程分支 <code>git push origin :dev</code></li><li>查看未合并的分支(切换到 main) <code>git branch --no-merged</code></li><li>查看已经合并的分支(切换到 main) <code>git branch --merged</code></li></ol><h2 id="三、历史版本" tabindex="-1">三、历史版本 <a class="header-anchor" href="#三、历史版本" aria-label="Permalink to &quot;三、历史版本&quot;">​</a></h2><p>下面演示基于历史版本创建分支</p><p>首先查看历史版本提交日志</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> log</span></span></code></pre></div><p>切换到提交的 commit-id 历史版本</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> checkout</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> commit-id</span></span></code></pre></div><p>以历史版本 <code>commit-id</code> 创建新分支</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> checkout</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> commit-id</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -b</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 新分支名称</span></span></code></pre></div>`,26),n=[l];function h(p,d,c,o,k,g){return i(),a("div",null,n)}const b=s(t,[["render",h]]);export{F as __pageData,b as default};
