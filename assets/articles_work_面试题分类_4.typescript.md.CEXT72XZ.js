import{_ as s,o as i,c as a,R as n}from"./chunks/framework.ka86hsJC.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/work/面试题分类/4.typescript.md","filePath":"articles/work/面试题分类/4.typescript.md","lastUpdated":1701168128000}'),p={name:"articles/work/面试题分类/4.typescript.md"},t=n(`<h2 id="typescript" tabindex="-1">TypeScript <a class="header-anchor" href="#typescript" aria-label="Permalink to &quot;TypeScript&quot;">​</a></h2><h2 id="type和interface的区别" tabindex="-1">type和interface的区别 <a class="header-anchor" href="#type和interface的区别" aria-label="Permalink to &quot;type和interface的区别&quot;">​</a></h2><ol><li><p>声明方式：</p><ul><li><p><code>type</code> 是使用 <code>type</code> 关键字定义类型别名，可以为基本类型、联合类型、交叉类型等复杂类型提供一个名称。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Point</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  y</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div></li><li><p><code>interface</code> 是使用 <code>interface</code> 关键字定义接口，主要用于描述对象的结构。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Point</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  y</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></li></ul></li><li><p>扩展：</p><ul><li><p><code>type</code> 可以使用交叉类型 <code>&amp;</code> 进行扩展。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Age</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  age</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Age</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div></li><li><p><code>interface</code> 可以使用 <code>extends</code> 关键字进行扩展。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Age</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  age</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Person</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Age</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}</span></span></code></pre></div></li></ul></li><li><p>合并声明：</p><ul><li><code>type</code> 不能进行合并声明，同名的 <code>type</code> 会导致错误。</li><li><code>interface</code> 可以进行合并声明，同名的 <code>interface</code> 会自动合并，合并后的接口包含所有声明的属性。</li></ul></li><li><p>类型映射：</p><ul><li><p><code>type</code> 可以使用映射类型创建新类型，例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReadonlyPoint</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Readonly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Point</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;;</span></span></code></pre></div></li><li><p><code>interface</code> 不能直接使用映射类型，但可以通过交叉类型和映射类型创建新接口：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ReadonlyPoint</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Readonly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Point</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {}</span></span></code></pre></div></li></ul></li><li><p>其他类型表示：</p><ul><li><p><code>type</code> 支持联合类型、元组类型、映射类型等更多类型表示。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Coordinate</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Shape</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;circle&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;square&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;rectangle&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div></li></ul></li></ol><ul><li><code>interface</code> 主要用于描述对象的结构，不支持其他类型表示。</li></ul><p>总结一下，<code>type</code> 和 <code>interface</code> 在 TypeScript 中都可以用于定义复杂类型，但它们在声明方式、扩展、合并声明和类型表示等方面有所不同。<code>type</code> 更灵活，支持更多类型表示，而 <code>interface</code> 更适用于描述对象结构，可以进行合并声明。</p><h2 id="object类型和object类型的区别" tabindex="-1">object类型和Object类型的区别 <a class="header-anchor" href="#object类型和object类型的区别" aria-label="Permalink to &quot;object类型和Object类型的区别&quot;">​</a></h2><p>在 TypeScript 中，<code>object</code>类型是指非原始类型，即除了 <code>number</code>、<code>string</code>、<code>boolean</code>、<code>symbol</code>、<code>null</code> 和 <code>undefined</code> 之外的类型。而 <code>Object</code> 类型是 JavaScript 中的全局对象类型，包含了一些内置方法和属性（如 <code>toString()</code> 和 <code>valueOf()</code>），可以进行类型转换。</p><p>一个实例化的 JavaScript 对象的类型是 <code>Object</code>，而一个非原始类型的值的类型是 <code>object</code>。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> obj1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> object</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {};    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// OK</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> obj2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Object</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {};    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// OK</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> num1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> object</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 42</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Error</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> num2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Object</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 42</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// OK, 但不推荐，因为 42 为原始类型</span></span></code></pre></div><p>总之，<code>object</code>表示任何非原始类型的值，而 <code>Object</code>表示 JavaScript 的全局对象类型。</p><h2 id="谈谈你对enum枚举类型的理解" tabindex="-1">谈谈你对Enum枚举类型的理解 <a class="header-anchor" href="#谈谈你对enum枚举类型的理解" aria-label="Permalink to &quot;谈谈你对Enum枚举类型的理解&quot;">​</a></h2><p>在 TypeScript 中，枚举（Enum）是一种特殊的数据类型，它允许为一组相关的值赋予有意义的名字。枚举类型可以帮助提高代码的可读性和可维护性。以下是关于 TypeScript 中枚举类型的一些关键点：</p><ol><li><p>声明枚举：</p><p>使用 <code>enum</code> 关键字定义一个枚举类型。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enum</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Red</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Green</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Blue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></li><li><p>使用枚举：</p><p>可以通过枚举类型名字访问枚举值。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> myColor</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Color</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Color.Red;</span></span></code></pre></div></li><li><p>数字枚举：</p><p>默认情况下，枚举值是从 0 开始自增的数字。你也可以为某个成员显式指定一个数字，后续成员将从该数字开始自增。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enum</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Direction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Up</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Down</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 3</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Right</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 4</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></li><li><p>字符串枚举：</p><p>除了数字枚举，TypeScript 还支持字符串枚举。在字符串枚举中，每个成员都需要显式地赋予一个字符串值。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enum</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> HttpMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  GET</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;GET&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  POST</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;POST&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  PUT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;PUT&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  DELETE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;DELETE&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></li><li><p>反向映射：</p><p>数字枚举具有反向映射的特性，这意味着可以通过枚举值得到枚举名。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enum</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  OK</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  NotFound</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 404</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Status[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 输出 &quot;OK&quot;</span></span></code></pre></div><p>字符串枚举没有反向映射特性。</p></li><li><p>常量枚举：</p><p>使用 <code>const</code> 关键字声明常量枚举。常量枚举在编译时会被计算，<strong>不会在编译后的代码中生成实际的枚举对象</strong>，可以减少生成的代码体积。例如：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> enum</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Weekday</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Sunday</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Monday</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Tuesday</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Wednesday</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Thursday</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Friday</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Saturday</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></li></ol><p>总之，TypeScript 中的枚举类型提供了一种为一组相关值赋予有意义名字的方法，增强了代码的可读性和可维护性。枚举类型包括数字枚举、字符串枚举和常量枚举，可以根据不同的需求选择使用。</p><h2 id="谈谈你对泛型的理解" tabindex="-1">谈谈你对泛型的理解 <a class="header-anchor" href="#谈谈你对泛型的理解" aria-label="Permalink to &quot;谈谈你对泛型的理解&quot;">​</a></h2><p>泛型是一种在定义函数、接口或类时不预先指定具体的类型，而是在使用时指定的一种特性。在TypeScript中，泛型被广泛应用以增加代码的重用性和可维护性。</p><p>以下是我对TypeScript中泛型的理解：</p><ol><li><strong>类型安全</strong>：泛型可以帮助我们在编译时检查类型信息。这种特性可以有效地减少运行时的错误，因为我们可以在代码编写阶段就捕获潜在的类型错误。</li><li><strong>代码重用</strong>：我们可以编写一个适用于多种类型的函数，而不是针对每一种类型都写一个函数。泛型可以提高代码的复用性，减少不必要的代码重复。</li><li><strong>灵活性</strong>：泛型提供了高度的灵活性，我们可以在编写函数或类时不必预先指定具体的类型，而是在使用这些函数或类时指定类型。这样就使得我们的函数或类可以适应更广泛的情况。</li><li><strong>类型推断</strong>：在许多情况下，TypeScript编译器可以自动推断出泛型的类型，这大大减少了我们编写和阅读代码时的工作量。</li></ol><h2 id="any和unknown的区别" tabindex="-1">any和unknown的区别？ <a class="header-anchor" href="#any和unknown的区别" aria-label="Permalink to &quot;any和unknown的区别？&quot;">​</a></h2><p>在 TypeScript 中，<code>any</code> 和 <code>unknown</code> 都可以代表任何类型的值。但是它们在类型安全性和如何使用上有显著的差异。</p><ol><li><p><strong>类型检查</strong>：</p><ul><li><code>any</code>：当你将一个值标记为 <code>any</code> 类型时，TypeScript 将不会对这个值进行任何类型检查。这意味着，你可以在该值上进行任何操作，而不会得到编译时的错误。</li><li><code>unknown</code>：它表示一个未知的值的类型。你不能直接对 <code>unknown</code> 类型的值进行操作，也不能将它分配给除 <code>unknown</code> 和 <code>any</code> 类型之外的其他类型的变量，除非你先进行类型检查或类型断言。</li></ul></li><li><p><strong>安全性</strong>：</p><ul><li><code>any</code>：使用 <code>any</code> 会绕过 TypeScript 的类型系统，可能导致运行时错误。它提供了最大的灵活性，但也损失了类型安全性。</li><li><code>unknown</code>：要操作 <code>unknown</code> 类型的值，你必须先确保这个值是你期望的类型。这迫使你更加谨慎地处理这些值，增加了类型安全性。</li></ul></li><li><p><strong>使用场景</strong>：</p><ul><li><code>any</code>：当你确实不关心类型或从老的 JavaScript 代码迁移到 TypeScript 时，可能会使用 <code>any</code> 作为临时解决方案。</li><li><code>unknown</code>：当你想表示一个可以是任何类型的值，但仍然想保持类型安全性时，可以使用 <code>unknown</code>。</li></ul></li></ol><p><strong>示例</strong>：</p><p>考虑以下代码片段：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> any</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;hello&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 这里不会有错误，因为 a 是 any 类型</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> unknown</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;hello&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> y</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 错误！不能将类型 &quot;unknown&quot; 分配给类型 &quot;number&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;number&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> z</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 在这里没问题，因为我们已经检查了 x 的类型</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>总之，<code>unknown</code> 提供了一种在不完全确定类型时保持类型安全性的方式，而 <code>any</code> 则完全关闭了 TypeScript 的类型检查。在可能的情况下，推荐使用 <code>unknown</code> 而不是 <code>any</code>，以保持代码的类型安全性。</p><h2 id="谈谈你对词法作用域的理解" tabindex="-1">谈谈你对词法作用域的理解 <a class="header-anchor" href="#谈谈你对词法作用域的理解" aria-label="Permalink to &quot;谈谈你对词法作用域的理解&quot;">​</a></h2><p>词法作用域（有时也称为静态作用域）是在编程中用于确定变量可见性和生命周期的一种作用域规则。以下是对词法作用域的深入理解：</p><ol><li><p><strong>定义时确定</strong>：词法作用域是在代码的编写阶段定义的，而不是在运行时。换句话说，作用域是由代码的物理结构决定的，而不是它是如何被调用的。</p></li><li><p><strong>嵌套结构</strong>：在词法作用域中，我们可以在一个函数内部定义另一个函数，从而形成一个嵌套的作用域链。内部函数可以访问其外部函数的变量和参数，但外部函数不能访问其内部函数的变量。</p></li><li><p><strong>全局与局部</strong>：</p><ul><li><strong>全局作用域</strong>：定义在所有函数外部的变量拥有全局作用域。全局变量可以在代码的任何地方访问。</li><li><strong>局部作用域</strong>：在函数内部定义的变量拥有局部作用域。它们只能在函数内部被访问。</li></ul></li><li><p><strong>作用域链</strong>：当在一个作用域内查找一个变量时，如果当前作用域没有定义该变量，查找会继续到包含（外部）作用域，直到找到该变量或达到全局作用域。这种查找链被称为作用域链。</p></li><li><p><strong>与动态作用域的区别</strong>：词法作用域与动态作用域是两种不同的作用域规则。在动态作用域中，作用域是由函数如何被调用决定的，而不是代码的结构。JavaScript 使用的是词法作用域，而不是动态作用域。</p></li><li><p><strong>闭包</strong>：闭包是词法作用域和函数的强大组合。当函数能够记住并访问其词法作用域，即使当该函数在其原始词法作用域之外执行时，我们就称之为闭包。</p></li><li><p><strong>阻止变量提升</strong>：在 JavaScript 中，<code>let</code> 和 <code>const</code> 关键字（ES6及之后的版本引入）为变量定义提供了块级作用域，这与传统的 <code>var</code> 关键字有所不同。</p></li><li><p><strong>性能考虑</strong>：由于词法作用域是在编译时确定的，编译器可以对代码进行优化。知道哪些变量在哪里被访问，以及它们如何被访问，可以帮助编译器提高代码的执行效率。</p></li></ol><hr>`,29),l=[t];function h(e,k,d,r,c,o){return i(),a("div",null,l)}const E=s(p,[["render",h]]);export{y as __pageData,E as default};
