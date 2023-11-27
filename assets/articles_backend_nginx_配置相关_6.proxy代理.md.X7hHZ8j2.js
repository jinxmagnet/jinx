import{_ as s,o as i,c as a,R as n}from"./chunks/framework.KB1hzIC4.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{"author":"coder-li","tags":"nginx/modules/ngx_http_proxy_mudule","aliases":"nginx反向代理"},"headers":[],"relativePath":"articles/backend/nginx/配置相关/6.proxy代理.md","filePath":"articles/backend/nginx/配置相关/6.proxy代理.md","lastUpdated":1701094652000}'),t={name:"articles/backend/nginx/配置相关/6.proxy代理.md"},p=n(`<div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># URL指向的是真正的业务服务器</span></span>
<span class="line"><span>Syntax:	    proxy_pass URL;</span></span>
<span class="line"><span>Default:	—</span></span>
<span class="line"><span>Context:    location, if in location, limit_except</span></span></code></pre></div><div class="language-zsh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_pass</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://www.baidu.com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_redirect</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_set_header</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $proxy_host;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_set_header</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> X-Real-IP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_set_header</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> X-Forwarded-For</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$proxy_add_x_forwarded_for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_connect_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 30</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_send_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 60</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_read_timeout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 60</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_buffering</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_buffer_size</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 32</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_buffers</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 128</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_busy_buffers_size</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 256</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	proxy_max_temp_file_size</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 256</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">k</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,2),l=[p];function h(e,k,r,d,F,o){return i(),a("div",null,l)}const g=s(t,[["render",h]]);export{y as __pageData,g as default};
