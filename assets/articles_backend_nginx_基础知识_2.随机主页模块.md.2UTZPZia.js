import{_ as s,o as i,c as a,R as n}from"./chunks/framework.KB1hzIC4.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{"author":"coder-li","tags":"nginx随机主页模块 nginx/modules/random_index_module","aliases":"随机主页"},"headers":[],"relativePath":"articles/backend/nginx/基础知识/2.随机主页模块.md","filePath":"articles/backend/nginx/基础知识/2.随机主页模块.md","lastUpdated":1701094652000}'),t={name:"articles/backend/nginx/基础知识/2.随机主页模块.md"},l=n(`<p>通过设置server块中的主页location配置</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#lj.conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	listen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	server_name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> localhost</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		root</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/share/nginx/html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">		#index index.html;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		random_index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /nginx_status</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		stub_status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		allow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> all</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	error_page</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 404</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /404.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /404.html</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		root</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/share/nginx/html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>如上，将index配置行注释，新增<code>random_index on</code>，代表的是主页为<code>/usr/share/nginx/html</code>路径下的一个随机html文件</p><p>===注意=== 隐藏的html文件不会被随机到，如<code>.xxx.html</code>，以<code>.</code>开头的文件</p>`,4),h=[l];function p(e,k,r,d,F,c){return i(),a("div",null,h)}const g=s(t,[["render",p]]);export{E as __pageData,g as default};
