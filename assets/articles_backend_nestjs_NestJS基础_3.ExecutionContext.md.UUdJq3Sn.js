import{_ as s,o as a,c as n,R as e}from"./chunks/framework.gdc2w2R7.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/backend/nestjs/NestJS基础/3.ExecutionContext.md","filePath":"articles/backend/nestjs/NestJS基础/3.ExecutionContext.md","lastUpdated":1703471746000}'),t={name:"articles/backend/nestjs/NestJS基础/3.ExecutionContext.md"},p=e(`<p>开启掘金成长之旅！这是我参与「掘金日新计划 · 12 月更文挑战」的第8天，<a href="https://juejin.cn/post/7167294154827890702" target="_blank" rel="noreferrer">点击查看活动详情</a></p><p>本篇文章主要是补一下前面的坑，ArgumentsHost和ExecutionContext、装饰器SetMetadata，以及反射类Reflector</p><h2 id="一、argumentshost" tabindex="-1">一、ArgumentsHost <a class="header-anchor" href="#一、argumentshost" aria-label="Permalink to &quot;一、ArgumentsHost&quot;">​</a></h2><p>ArgumentsHost提供了一系列方法用来获取传递给handler的参数，我们可以选择使用的上下文类型，包括HTTP、RPC、WebSocket等。nest框架为我们提供了很多实例入口，一般都是叫做host的一个参数，比如在ExceptionFilter接口中需要实现的catch方法第二个参数就是它：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { ArgumentsHost } from &#39;../features/arguments-host.interface&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export interface ExceptionFilter&lt;T = any&gt; {</span></span>
<span class="line"><span>  catch(exception: T, host: ArgumentsHost): any;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>ArgumentsHost属于抽象级别，针对不同的协议环境有不同的含义，比如默认的使用Express驱动的应用，host对象中封装了Argument数组为[request, response, next]，对于GraphQL应用，host对象中由封装了Argument数组为[root, args, context, info]等，需要根据不同情况进行不同的使用</p><h3 id="_1-获取类型" tabindex="-1">1. 获取类型 <a class="header-anchor" href="#_1-获取类型" aria-label="Permalink to &quot;1. 获取类型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>if (host.getType() === &#39;http&#39;) {</span></span>
<span class="line"><span>  // 我们一般在这里做事，http的事，表示比较弱，哈哈</span></span>
<span class="line"><span>} else if (host.getType() === &#39;rpc&#39;) {</span></span>
<span class="line"><span>  // do something that is only important in the context of Microservice requests</span></span>
<span class="line"><span>} else if (host.getType&lt;GqlContextType&gt;() === &#39;graphql&#39;) {</span></span>
<span class="line"><span>  // do something that is only important in the context of GraphQL requests</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-获取arguments数组" tabindex="-1">2. 获取Arguments数组 <a class="header-anchor" href="#_2-获取arguments数组" aria-label="Permalink to &quot;2. 获取Arguments数组&quot;">​</a></h3><h4 id="方式一-getargs" tabindex="-1">方式一：getArgs() <a class="header-anchor" href="#方式一-getargs" aria-label="Permalink to &quot;方式一：getArgs()&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const [req, res, next] = host.getArgs();</span></span></code></pre></div><h4 id="方式二-getargbyindex-0-1-2" tabindex="-1">方式二：getArgByIndex(0/1/2) <a class="header-anchor" href="#方式二-getargbyindex-0-1-2" aria-label="Permalink to &quot;方式二：getArgByIndex(0/1/2)&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const request = host.getArgByIndex(0);</span></span>
<span class="line"><span>const response = host.getArgByIndex(1);</span></span></code></pre></div><h4 id="方式三-使用switch-推荐使用" tabindex="-1">方式三：使用switch（推荐使用！） <a class="header-anchor" href="#方式三-使用switch-推荐使用" aria-label="Permalink to &quot;方式三：使用switch（推荐使用！）&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * Switch context to RPC.</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>switchToRpc(): RpcArgumentsHost;</span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * Switch context to HTTP.</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>switchToHttp(): HttpArgumentsHost;</span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * Switch context to WebSockets.</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>switchToWs(): WsArgumentsHost;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 使用Express的这两个类型</span></span>
<span class="line"><span>import { Request, Response } from &#39;express&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const ctx = host.switchToHttp();</span></span>
<span class="line"><span>const request = ctx.getRequest&lt;Request&gt;();</span></span>
<span class="line"><span>const response = ctx.getResponse&lt;Response&gt;();</span></span></code></pre></div><ul><li>http -&gt; HttpArgumentsHost</li><li>webSocket -&gt; WsArgumentsHost</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export interface WsArgumentsHost {</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * Returns the data object.</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  getData&lt;T&gt;(): T;</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * Returns the client object.</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  getClient&lt;T&gt;(): T;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>RPC -&gt; RpcArgumentsHost</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export interface RpcArgumentsHost {</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * Returns the data object.</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  getData&lt;T&gt;(): T;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * Returns the context object.</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  getContext&lt;T&gt;(): T;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="二、executioncontext" tabindex="-1">二、ExecutionContext <a class="header-anchor" href="#二、executioncontext" aria-label="Permalink to &quot;二、ExecutionContext&quot;">​</a></h2><p>该类继承自ArgumentsHost，不过进行了扩展，我们前面讲的Guard中的canActivate()方法和interceptor中的interce()方法中都有它的身影</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export interface ExecutionContext extends ArgumentsHost {</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * Returns the type of the controller class which the current handler belongs to.</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  getClass&lt;T&gt;(): Type&lt;T&gt;;</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * Returns a reference to the handler (method) that will be invoked next in the</span></span>
<span class="line"><span>   * request pipeline.</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  getHandler(): Function;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>关于两个方法，举个栗子比较直观</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Controller()</span></span>
<span class="line"><span>export class CatsController{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Post()</span></span>
<span class="line"><span>  create(){}</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const methodKey = ctx.getHandler().name; // &quot;create&quot;</span></span>
<span class="line"><span>const className = ctx.getClass().name; // &quot;CatsController&quot;</span></span></code></pre></div><p>getClass得到的是类而不是它的实例，getHandler得到的是函数的引用，这有什么用呢？</p><p><strong>可以为我们获取元数据做准备！我们可以在他们上面自定义元数据，并在guard和interpretor中获取</strong></p><h2 id="三、reflection和metadata" tabindex="-1">三、Reflection和metadata <a class="header-anchor" href="#三、reflection和metadata" aria-label="Permalink to &quot;三、Reflection和metadata&quot;">​</a></h2><h3 id="_1-setmetadata" tabindex="-1">1. SetMetadata <a class="header-anchor" href="#_1-setmetadata" aria-label="Permalink to &quot;1. SetMetadata&quot;">​</a></h3><p>Nest提供了通过@SetMetadata(key, value)装饰器为route handler添加自定义元数据的方法，添加后可以通过反射取到对应的数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Post()</span></span>
<span class="line"><span>@SetMetadata(&#39;roles&#39;, [&#39;admin&#39;])</span></span>
<span class="line"><span>async create(@Body() createCatDto: CreateCatDto) {</span></span>
<span class="line"><span>  this.catsService.create(createCatDto);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>不过一般我们不这样做，我们会创建自定义的装饰器，把SetMetadata包装在里面，如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { SetMetadata } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const Roles = (...roles: string[]) =&gt; SetMetadata(&#39;roles&#39;, roles);</span></span></code></pre></div><p>这样我们就可以使用@Roles()这个装饰器装饰router handler</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Post()</span></span>
<span class="line"><span>@Roles(&#39;admin&#39;)</span></span>
<span class="line"><span>async create(@Body() createCatDto: CreateCatDto) {</span></span>
<span class="line"><span>  this.catsService.create(createCatDto);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-reflector" tabindex="-1">2. Reflector <a class="header-anchor" href="#_2-reflector" aria-label="Permalink to &quot;2. Reflector&quot;">​</a></h3><p>这是nest提供的一个helper class，它可以被注入到类的构造函数中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class RolesGuard {</span></span>
<span class="line"><span>  constructor(private reflector: Reflector) {}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="装饰的是route-handler" tabindex="-1">装饰的是route handler <a class="header-anchor" href="#装饰的是route-handler" aria-label="Permalink to &quot;装饰的是route handler&quot;">​</a></h4><p>想要获取到route handler的元数据，可以使用get()方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const roles = this.reflector.get&lt;string[]&gt;(&#39;roles&#39;, context.getHandler());</span></span></code></pre></div><p>getHandler给我们返回的是route handler的方法method，这里返回的就是create这个函数引用</p><h4 id="装饰的是controller" tabindex="-1">装饰的是Controller <a class="header-anchor" href="#装饰的是controller" aria-label="Permalink to &quot;装饰的是Controller&quot;">​</a></h4><p>如果@Role()装饰器装饰的是Controller而不是route handler，那使用getClass来获取Controller的那个class</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Roles(&#39;admin&#39;)</span></span>
<span class="line"><span>@Controller(&#39;cats&#39;)</span></span>
<span class="line"><span>export class CatsController {}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const roles = this.reflector.get&lt;string[]&gt;(&#39;roles&#39;, context.getClass());</span></span></code></pre></div><h4 id="route-handler和controller两者都有装饰" tabindex="-1">route handler和Controller两者都有装饰 <a class="header-anchor" href="#route-handler和controller两者都有装饰" aria-label="Permalink to &quot;route handler和Controller两者都有装饰&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Roles(&#39;user&#39;)</span></span>
<span class="line"><span>@Controller(&#39;cats&#39;)</span></span>
<span class="line"><span>export class CatsController {</span></span>
<span class="line"><span>  @Post()</span></span>
<span class="line"><span>  @Roles(&#39;admin&#39;)</span></span>
<span class="line"><span>  async create(@Body() createCatDto: CreateCatDto) {</span></span>
<span class="line"><span>    this.catsService.create(createCatDto);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>有两个方法，带来两种不同的结果</p><ul><li>getAllAndOverride</li></ul><p>这个方法会把Controller层面的作为默认值，route handler层面的作为覆盖值，会覆盖Controller层面的装饰</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const roles = this.reflector.getAllAndOverride&lt;string[]&gt;(&#39;roles&#39;, [</span></span>
<span class="line"><span>  context.getHandler(),</span></span>
<span class="line"><span>  context.getClass(),</span></span>
<span class="line"><span>]);</span></span></code></pre></div><p>结果是[&#39;admin&#39;]</p><p>这里有一个小坑，经过我的测试，getHandler和getClass的顺序会影响水覆盖谁，我的结论是，谁在前最后返回的就是谁，上面返回的是route handler装饰的值，如果把getClass写在前面，则返回的是Controller装饰的值</p><ul><li>getAllAndMerge</li></ul><p>保留两个层面的装饰时使用，会将两个数组进行merge</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const roles = this.reflector.getAllAndMerge&lt;string[]&gt;(&#39;roles&#39;, [</span></span>
<span class="line"><span>  context.getHandler(),</span></span>
<span class="line"><span>  context.getClass(),</span></span>
<span class="line"><span>]);</span></span></code></pre></div><p>结果是[&#39;user&#39;, &#39;admin&#39;]</p>`,59),l=[p];function i(o,c,r,h,d,g){return a(),n("div",null,l)}const m=s(t,[["render",i]]);export{b as __pageData,m as default};
