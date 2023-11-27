import{_ as s,o as a,c as n,R as p}from"./chunks/framework.KB1hzIC4.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/backend/nestjs/NestJS基础/1.九大核心概念.md","filePath":"articles/backend/nestjs/NestJS基础/1.九大核心概念.md","lastUpdated":1701094652000}'),e={name:"articles/backend/nestjs/NestJS基础/1.九大核心概念.md"},t=p(`<p>Nestjs的核心概念很多，如果是学过java的兄弟会比较熟悉，刚开始接触还是会有一些陌生，希望通过本文轻轻松松理解Nestjs的这些核心概念，先来整体看一下有哪些：</p><ul><li>Controllers</li><li>Providers</li><li>Modules</li><li>Middleware</li><li>Exception filters</li><li>Pipes</li><li>Guards</li><li>Interceptors</li><li>Custom decorators</li></ul><p>总共9个东西，要想全部掌握还是需要一定时间的，本文是个人学习笔记，也算是抛砖引玉，说的不到位的地方，大佬勿喷。</p><p>熟悉java的同学，对spring容器一定很熟悉，它可以用来管理对象，这些对象不用自己new出来，只需要加上类似@Controller的注解就会自动产生一个对象，全全由容器负责管理，这其实是一种单例模式的思想。</p><h2 id="一、controllers" tabindex="-1">一、Controllers <a class="header-anchor" href="#一、controllers" aria-label="Permalink to &quot;一、Controllers&quot;">​</a></h2><p>Controllers are responsible for handling incoming <strong>requests</strong> and returning <strong>responses</strong> to the client.</p><p>控制器是用来做路由导航的，控制着你的请求路径去往何方，比如<a href="http://xxx.com/user%EF%BC%8C%E5%8C%B9%E9%85%8D%E7%9A%84%E8%B7%AF%E5%BE%84%E6%98%AF/user%E3%80%82" target="_blank" rel="noreferrer">http://xxx.com/user，匹配的路径是/user。</a></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18ce1d3e647f41cda8e7402d0e730a93~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><ul><li>通过@Controller(...path...)来构造一个控制器，</li><li>在Module的中的@Module装饰器内放入控制器，@Module({controllers:[xxxController]})只有这样，Nest的Ioc容器才会产生出该控制器的实例，才能为你的application所用</li><li>常用的方法装饰器有@Get()、@Post()、@Patch()、@Delete()、等等</li><li>常用的方法参数装饰器有@Body()、@Query()、@Param()、@Request()/@Req()、@Response()/@Res()</li><li>@HttpCode()、@Header()、@Redirect()等这几个可能用的比较少，反正我目前基本不用</li></ul><h2 id="二、providers" tabindex="-1">二、Providers <a class="header-anchor" href="#二、providers" aria-label="Permalink to &quot;二、Providers&quot;">​</a></h2><p>Providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can be <strong>injected</strong> as a dependency; this means objects can create various relationships with each other, and the function of &quot;wiring up&quot; instances of objects can largely be delegated to the Nest runtime system.</p><p>Providers是一个很基本的概念，很多Nest中定义的类可以被视为一个Provider，我理解的Provider其实就是可以为各个模块提供服务的，这个服务范围很广，例如可以是一个操作数据库某张表的Service，还可以是一个具体的值，这些服务可以被注入依赖体系，注入相关依赖后，可以在方使用。这个和java中的@Autowired()自动装配比较类似，但是也有很多不同，</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54e7c70ff49b4f6ab8d4f9e45da03ef6~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>我们使用最多的还是类，下面主要以类来举例</p><h3 id="_1-最常用的服务就是类" tabindex="-1">1. 最常用的服务就是类！ <a class="header-anchor" href="#_1-最常用的服务就是类" aria-label="Permalink to &quot;1. 最常用的服务就是类！&quot;">​</a></h3><ul><li><strong>服务类使用@Injectable()装饰器装饰，表明该类可以由Nest的IoC容器管理</strong></li><li><strong>服务需要在对应的module中进行注册，如果不注册IoC容器是不会帮你创建对象的，而且还会报错</strong></li><li><strong>在其它类中使用时（如Controller控制器中），在该类的构造函数的参数中进行注入(后面也会讲通过属性注入的方法)</strong></li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bae2b388774d4b069a686bc7d9a85740~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>强调一下这里的依赖注入，可以看到是通过类构造函数来的， constructor(private readonly userService: UserService) {}，Nest提供了IoC容器利用Typescript自带类型的特点自动创建对象的能力，注意这里是单例模式，如果该Service在其它地方也被用过，那么会在不会重新创建对象，各个应用只会有一个该Service的对象，容器会先寻找当前有没有，如果没有再进行创建。</p><ul><li><strong>生命周期：默认情况下随着整个应用的启动而产生，随着应用的关闭而销毁，但是也可以自定义，可以随着请求的生命周期进行调整</strong></li></ul><h3 id="_2-自定义的provider" tabindex="-1">2. 自定义的provider <a class="header-anchor" href="#_2-自定义的provider" aria-label="Permalink to &quot;2. 自定义的provider&quot;">​</a></h3><p>就如刚开始将Provider的图示所描述的，provider可以是单纯地值，可以是类，可以一个工厂函数，其实上面类的写法是一种语法糖写法</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df26a426f4364a439d393b7570543779~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>可以看出完整写法，通过给不同的provider标注不同的token，注入的时候使用@Inject(对应的token)进行注入</p><p>注意这里的provide属性，可以使用类名、strings、symbols或者enums，最佳实践中，一般把所有用到的token单独放到一个文件中，比如constants.ts，专门用来提供程序用到的所有token。</p><h4 id="usefactory" tabindex="-1">useFactory <a class="header-anchor" href="#usefactory" aria-label="Permalink to &quot;useFactory&quot;">​</a></h4><p>关于工厂函数useFactory，多说几句。它可以提供动态的provider，由factory函数的返回值来确定，factory函数可以很简单也可以很复杂，它也可以使用其它provider，不过需要注入，在inject属性进行注入，注入的provider可以是可选的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const connectionProvider = {</span></span>
<span class="line"><span>  provide: &#39;CONNECTION&#39;,</span></span>
<span class="line"><span>  useFactory: (optionsProvider: OptionsProvider, optionalProvider?: string) =&gt; {</span></span>
<span class="line"><span>    const options = optionsProvider.get();</span></span>
<span class="line"><span>    return new DatabaseConnection(options);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  inject: [OptionsProvider, { token: &#39;SomeOptionalProvider&#39;, optional: true }],</span></span>
<span class="line"><span>  //       _____________/            __________________/</span></span>
<span class="line"><span>  //        This provider              The provider with this</span></span>
<span class="line"><span>  //        is mandatory.              token can resolve to \`undefined\`.</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [</span></span>
<span class="line"><span>    connectionProvider,</span></span>
<span class="line"><span>    OptionsProvider,</span></span>
<span class="line"><span>    // { provide: &#39;SomeOptionalProvider&#39;, useValue: &#39;anything&#39; },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre></div><h4 id="useexisting" tabindex="-1">useExisting <a class="header-anchor" href="#useexisting" aria-label="Permalink to &quot;useExisting&quot;">​</a></h4><p>这其实只是一个别名的使用，相当于给同一个provider多个token，如下，当我们注入的时候@Inject(&#39;AliasedLoggerService&#39;)和@Inject(LoggerService)，最终使用的是同一个LoggerService的实例</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Injectable()</span></span>
<span class="line"><span>class LoggerService {</span></span>
<span class="line"><span>  /* implementation details */</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const loggerAliasProvider = {</span></span>
<span class="line"><span>  provide: &#39;AliasedLoggerService&#39;,</span></span>
<span class="line"><span>  useExisting: LoggerService,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [LoggerService, loggerAliasProvider],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre></div><p>想了解更多关于自定义provider的知识，请移步官网：<a href="https://docs.nestjs.com/fundamentals/custom-providers" target="_blank" rel="noreferrer">https://docs.nestjs.com/fundamentals/custom-providers</a></p><h3 id="_3-跨模块共享服务" tabindex="-1">3. 跨模块共享服务 <a class="header-anchor" href="#_3-跨模块共享服务" aria-label="Permalink to &quot;3. 跨模块共享服务&quot;">​</a></h3><p>provider具有自己的作用域，默认只在声明provider的模块内起效。如果要跨模块进行共享，前提是该服务要在在module中进行导出，也就是exports操作，exports可以填入完整的provider，也可以只填它的token(token后面会说)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  controllers: [UserController],</span></span>
<span class="line"><span>  providers: [UserService],</span></span>
<span class="line"><span>  exports: [UserService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class UserModule {}</span></span></code></pre></div><p>其它模块想使用的话可以直接在module的imports中添加该模块或者在providers中添加该服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  // 方法一</span></span>
<span class="line"><span>  imports: [UserModule],</span></span>
<span class="line"><span>  // 方法二</span></span>
<span class="line"><span>  providers: [UserService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class UserModule {}</span></span></code></pre></div><p>或者也可以使用全局模块，为Module增加@Global()装饰器，比如我的数据库Orm的Module就作为了全局模块</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Global, Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { PrismaService } from &#39;./prisma.service&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Global()</span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [PrismaService],</span></span>
<span class="line"><span>  exports: [PrismaService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class PrismaModule {}</span></span></code></pre></div><p>当然，咱们所有的模块都需要在根模块AppModule中的imports引入进去</p><h3 id="_4-可选的provider" tabindex="-1">4.可选的provider <a class="header-anchor" href="#_4-可选的provider" aria-label="Permalink to &quot;4.可选的provider&quot;">​</a></h3><p>有些时候可能不需要实例化一个服务类，可能需要根据配置文件灵活处理，这时候可以给对应的注入服务再增加一个@Optional()装饰器就行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>constructor(@Optional() @Inject(&#39;service&#39;) private service: xxxService) {}</span></span></code></pre></div><h3 id="_5-通过属性注入" tabindex="-1">5. 通过属性注入 <a class="header-anchor" href="#_5-通过属性注入" aria-label="Permalink to &quot;5. 通过属性注入&quot;">​</a></h3><p>这种注入方式用的极少，一种情况是你的顶级服务类class依赖了一个或多个providers，它的后代class将一直通过super()的方式进行构造，想想也还是比较可怕的。这时可以使用属性构造的方法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Injectable, Inject } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class HttpService&lt;T&gt; {</span></span>
<span class="line"><span>  @Inject(&#39;HTTP_OPTIONS&#39;)</span></span>
<span class="line"><span>  private readonly httpClient: T;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果你的服务类没有继承自别的类，那请继续使用constructor构造函数来注入</p><h2 id="三、modules" tabindex="-1">三、Modules <a class="header-anchor" href="#三、modules" aria-label="Permalink to &quot;三、Modules&quot;">​</a></h2><p>A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that <strong>Nest</strong> makes use of to organize the application structure.</p><p>可以看出，nestjs也是模块化编程的思想，一个应用由一个个拆分的模块来组成，每个模块负责自己的一部分业务，一个应用至少有一个模块，也就是根模块，使用@Module()装饰器来声明一个模块，模块也是一个类。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ccda297aaf148a2818955d21233ff4c~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h3 id="_1-module-装饰器" tabindex="-1">1. @Module()装饰器 <a class="header-anchor" href="#_1-module-装饰器" aria-label="Permalink to &quot;1. @Module()装饰器&quot;">​</a></h3><p>需要一个参数，是一个对象，里面包含四个属性，用来描述这个module，上面其实已经都讲到了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [OtherModule],</span></span>
<span class="line"><span>  controllers: [UserController],</span></span>
<span class="line"><span>  providers: [UserService],</span></span>
<span class="line"><span>  exports:[UserService]</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class UserModule {}</span></span></code></pre></div><p>对于imports中导入的OtherModule，意味着OtherModule里exports的provider，可以在UserModule中使用</p><p>exports可以使用provider本身，亦可以使用provider的token</p><h3 id="_2-模块共享" tabindex="-1">2. 模块共享 <a class="header-anchor" href="#_2-模块共享" aria-label="Permalink to &quot;2. 模块共享&quot;">​</a></h3><p>在Provider中已经讲过了，就是通过exports导出相应的Service，在别的模块通过imports导入该模块</p><h3 id="_3-模块重导出" tabindex="-1">3. 模块重导出 <a class="header-anchor" href="#_3-模块重导出" aria-label="Permalink to &quot;3. 模块重导出&quot;">​</a></h3><p>这个感觉还是挺有用的，可以把一些常用的，公共的模块，全部先import进一个CommonModule，然后再把它们从exprots全部导出，以后如果有那个模块想要使用其中某个模块的Service，只需要将这个CommonModule导入即可，不用再导入所有的依赖模块</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [Module1, Module2, Module3, Module4],</span></span>
<span class="line"><span>  exports: [Module1, Module2, Module3, Module4],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class CommonModule {}</span></span></code></pre></div><h3 id="_4-模块类中也可以注入service" tabindex="-1">4. 模块类中也可以注入Service <a class="header-anchor" href="#_4-模块类中也可以注入service" aria-label="Permalink to &quot;4. 模块类中也可以注入Service&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { CatsController } from &#39;./cats.controller&#39;;</span></span>
<span class="line"><span>import { CatsService } from &#39;./cats.service&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  controllers: [CatsController],</span></span>
<span class="line"><span>  providers: [CatsService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class CatsModule {</span></span>
<span class="line"><span>  constructor(private catsService: CatsService) {}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_5-全局模块global-modules" tabindex="-1">5. 全局模块Global modules <a class="header-anchor" href="#_5-全局模块global-modules" aria-label="Permalink to &quot;5. 全局模块Global modules&quot;">​</a></h3><p>通过@Global()装饰器声明一个全局模块，只需要在根模块imports注册该全局模块，就可以在其他所有模块内使用它导出的Service</p><h3 id="_6-动态模块dynamic-modules" tabindex="-1">6. 动态模块Dynamic modules <a class="header-anchor" href="#_6-动态模块dynamic-modules" aria-label="Permalink to &quot;6. 动态模块Dynamic modules&quot;">​</a></h3><p>这是nest提供的一个强大功能，可以让我们对模块进行定制化操作，自定义模块的注册，动态提供providers，看一下官方的示例</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Module, DynamicModule } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { createDatabaseProviders } from &#39;./database.providers&#39;;</span></span>
<span class="line"><span>import { Connection } from &#39;./connection.provider&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [Connection],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class DatabaseModule {</span></span>
<span class="line"><span>  static forRoot(entities = [], options?): DynamicModule {</span></span>
<span class="line"><span>    const providers = createDatabaseProviders(options, entities);</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      module: DatabaseModule,</span></span>
<span class="line"><span>      providers: providers,</span></span>
<span class="line"><span>      exports: providers,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>原理其实很简单，就是给当前Module类提供一个forRoot方法，该方法返回一个新的Module，这个Module的类型是一个DynamicModule，在其他模块需要注册使用时，可以使用DatabaseModule.forRoot(参数)来动态的注册不同的Module，以达到提供不同providers的目的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [DatabaseModule.forRoot([User])],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre></div><p><strong>如果想在全局作用域内注册一个动态Module，则在forRoot方法的返回值对象中加入global:true这个属性，当然一般情况下，nestjs其实不提倡搞全局模块的，我们按需使用就行。</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  global: true,</span></span>
<span class="line"><span>  module: DatabaseModule,</span></span>
<span class="line"><span>  providers: providers,</span></span>
<span class="line"><span>  exports: providers,</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>动态模块的重导出可以省略forRoot()方法，如</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [DatabaseModule.forRoot([User])],</span></span>
<span class="line"><span>  exports: [DatabaseModule],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre></div><h2 id="四、middleware" tabindex="-1">四、Middleware <a class="header-anchor" href="#四、middleware" aria-label="Permalink to &quot;四、Middleware&quot;">​</a></h2><p>Middleware is a function which is called <strong>before</strong> the route handler. Middleware functions have access to the <a href="https://expressjs.com/en/4x/api.html#req" target="_blank" rel="noreferrer">request</a> and <a href="https://expressjs.com/en/4x/api.html#res" target="_blank" rel="noreferrer">response</a> objects, and the next() middleware function in the application’s request-response cycle. The <strong>next</strong> middleware function is commonly denoted by a variable named next.</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d15accfc9be34cf99a5fb542d4914792~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p><strong>中间件</strong>，学过Express和Koa的同学，对中间件这个概念应该很熟悉了。看官方说明，中间件可以拿到Request、Response对象及next函数，其实nest默认和express的中间件是等效的</p><p>再来回忆一下中间件的功能特性：</p><ul><li>可以执行任意的代码</li><li>对request和response对象进行改造</li><li>结束request-response循环</li><li>通过next()调用下一个中间件</li><li>如果当前中间件没有结束当前request-response循环，必须调用next()函数，否则请求会处于挂起状态，阻塞整个应用</li></ul><p>构造中间件的方式有两种，一种是通过函数，一种是通过类，下面看类的方式</p><h3 id="_1-创建类中间件" tabindex="-1">1. 创建类中间件 <a class="header-anchor" href="#_1-创建类中间件" aria-label="Permalink to &quot;1. 创建类中间件&quot;">​</a></h3><p>需要使用@Injectable()装饰器，类需要实现NestMiddleware接口(里面实现use方法)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Injectable, NestMiddleware } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { Request, Response, NextFunction } from &#39;express&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class LoggerMiddleware implements NestMiddleware {</span></span>
<span class="line"><span>  use(req: Request, res: Response, next: NextFunction) {</span></span>
<span class="line"><span>    console.log(&#39;Request...&#39;);</span></span>
<span class="line"><span>    next();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-应用类中间件" tabindex="-1">2. 应用类中间件 <a class="header-anchor" href="#_2-应用类中间件" aria-label="Permalink to &quot;2. 应用类中间件&quot;">​</a></h3><p>我们知道@Module()装饰器内没有给middleware的配置，那么怎么办呢？这时候我们需要在module类中使用config进行加载，需要让module类实现NestModule接口，实现里面configure方法进行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [],</span></span>
<span class="line"><span>  controllers: [],</span></span>
<span class="line"><span>  providers: [],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule implements NestModule {</span></span>
<span class="line"><span>  configure(consumer: MiddlewareConsumer): any {</span></span>
<span class="line"><span>    consumer.apply(LoggerMiddleware).forRoutes(&#39;&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>apply方法表名要加载的是哪个中间件，forRootes方法表名对哪个请求路径起作用，这个和app.use(路径, 中间件)如出一辙，这里还可以对forRoutes进行更详细的配置，传入一个对象针对特定的某一个请求，path可以使用正则匹配？、+、<em>、()等，使用fastify驱动的需要注意不能使用</em>，如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export class AppModule implements NestModule {</span></span>
<span class="line"><span>  configure(consumer: MiddlewareConsumer) {</span></span>
<span class="line"><span>    consumer</span></span>
<span class="line"><span>      .apply(LoggerMiddleware)</span></span>
<span class="line"><span>      .forRoutes({ path: &#39;ab*cd&#39;, method: RequestMethod.GET });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>注意，configure方法可以是异步的，如果里面有需要异步处理的操作，可以使用async/await来等待操作完成再往下进行</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export class AppModule implements NestModule {</span></span>
<span class="line"><span>  async configure(consumer: MiddlewareConsumer) {</span></span>
<span class="line"><span>    await ...</span></span>
<span class="line"><span>    consumer</span></span>
<span class="line"><span>      .apply(LoggerMiddleware)</span></span>
<span class="line"><span>      .forRoutes({ path: &#39;cats&#39;, method: RequestMethod.GET });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>默认情况下Nestjs应用使用express驱动，会使用body-parser来解析response的数据，如果你想自定义的话，需要在NestFactory.create()时将bodyParser置为false</p><h4 id="middlewareconsumer" tabindex="-1">MiddlewareConsumer <a class="header-anchor" href="#middlewareconsumer" aria-label="Permalink to &quot;MiddlewareConsumer&quot;">​</a></h4><ul><li>实现链式调用</li><li>apply可以放置多个middleware</li><li>forRoutes可以使用单个string路径，多个string路径，RouteInfo对象，单个Controller，多个Controller</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule implements NestModule {</span></span>
<span class="line"><span>  configure(consumer: MiddlewareConsumer) {</span></span>
<span class="line"><span>    consumer</span></span>
<span class="line"><span>      .apply(LoggerMiddleware, xxxMiddleware,...)</span></span>
<span class="line"><span>      .forRoutes(CatsController,UserController,...);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>exclude可以排除不使用中间件的路径</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>consumer</span></span>
<span class="line"><span>  .apply(LoggerMiddleware)</span></span>
<span class="line"><span>  .exclude(</span></span>
<span class="line"><span>    { path: &#39;cats&#39;, method: RequestMethod.GET },</span></span>
<span class="line"><span>    { path: &#39;cats&#39;, method: RequestMethod.POST },</span></span>
<span class="line"><span>    &#39;cats/(.*)&#39;,</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>  .forRoutes(CatsController);</span></span></code></pre></div><h3 id="_3-函数式中间件" tabindex="-1">3. 函数式中间件 <a class="header-anchor" href="#_3-函数式中间件" aria-label="Permalink to &quot;3. 函数式中间件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Request, Response, NextFunction } from &#39;express&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function logger(req: Request, res: Response, next: NextFunction) {</span></span>
<span class="line"><span>  console.log(\`Request...\`);</span></span>
<span class="line"><span>  next</span></span></code></pre></div><p>使用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>consumer</span></span>
<span class="line"><span>  .apply(logger)</span></span>
<span class="line"><span>  .forRoutes(CatsController);</span></span></code></pre></div><p>如果你的中间件不需要依赖其它东西时，可以尽可能使用函数式中间件，较为简单</p><h3 id="_4-全局中间件" tabindex="-1">4. 全局中间件 <a class="header-anchor" href="#_4-全局中间件" aria-label="Permalink to &quot;4. 全局中间件&quot;">​</a></h3><p>在main.ts中直接使用app.use(中间件)</p><p>如经常添加的解决跨域的中间件(下面还自定义了logger日志系统，后面抽空再单独出一篇关于日志的)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>async function bootstrap() {</span></span>
<span class="line"><span>  // 使用自定义winston日志</span></span>
<span class="line"><span>  const app = await NestFactory.create&lt;NestExpressApplication&gt;(AppModule, {</span></span>
<span class="line"><span>    logger: WinstonModule.createLogger({</span></span>
<span class="line"><span>      instance: logInstance,</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  // 跨域设置</span></span>
<span class="line"><span>  app.use(cors());</span></span>
<span class="line"><span>  await app.listen(7777);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>bootstrap();</span></span></code></pre></div><h2 id="五、exception-filters" tabindex="-1">五、Exception filters <a class="header-anchor" href="#五、exception-filters" aria-label="Permalink to &quot;五、Exception filters&quot;">​</a></h2><p>Nest comes with a built-in <strong>exceptions layer</strong> which is responsible for processing all unhandled exceptions across an application. When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.</p><p>nest内置了一个异常处理层，如果我们没有手动处理异常，所有的异常都会进到这里，系统将给出响应的提示信息。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a6de167abec43d7bb8c1be759105d64~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>如果没有手动做处理，发生异常时，response返回给前端的信息将是如下形式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;statusCode&quot;: 500,</span></span>
<span class="line"><span>  &quot;message&quot;: &quot;Internal server error&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_1-抛出标准异常" tabindex="-1">1. 抛出标准异常 <a class="header-anchor" href="#_1-抛出标准异常" aria-label="Permalink to &quot;1. 抛出标准异常&quot;">​</a></h3><p>nest内置了HttpException，可以直接抛出该异常</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Get()</span></span>
<span class="line"><span>async findAll() {</span></span>
<span class="line"><span>  throw new HttpException(&#39;Forbidden&#39;, HttpStatus.FORBIDDEN);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>客户端请求的得到的结果如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;statusCode&quot;: 403,</span></span>
<span class="line"><span>  &quot;message&quot;: &quot;Forbidden&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3920f483b8d740f68e452918e2435dca~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>关于参数：</p><ul><li>第1个参数是response，定义了返回给前端的response body，可以是一个字符串，也可以是一个对象</li><li>第2个参数是status，定义了HTTP的状态码，一般使用枚举来赋值，如HttpStatus.FORBIDDEN</li><li>第3个参数是可选的额外配置参数，提供一个cause属性，接收错误，在日志记录方面比较有用</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>getHello(@Request() req) {</span></span>
<span class="line"><span>  throw new HttpException(</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      status: HttpStatus.EXPECTATION_FAILED,</span></span>
<span class="line"><span>      error: &#39;this is a error msg&#39;,</span></span>
<span class="line"><span>      custom: &#39;this is a custom res&#39;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    HttpStatus.EXPECTATION_FAILED,</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      cause: new Error(&#39;实际的错误信息&#39;),</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>  return req.user;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>请求返回值将变成：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  status: HttpStatus.EXPECTATION_FAILED,</span></span>
<span class="line"><span>  error: &#39;this is a error msg&#39;,</span></span>
<span class="line"><span>  custom: &#39;this is a custom res&#39;,</span></span>
<span class="line"><span>},</span></span></code></pre></div><h3 id="_2-自定义异常" tabindex="-1">2. 自定义异常 <a class="header-anchor" href="#_2-自定义异常" aria-label="Permalink to &quot;2. 自定义异常&quot;">​</a></h3><p>我们可以创建一个类继承HttpException，在里面进行一些自定义配置，然后使用的时候直接throw xxxException</p><p>官网给我们内置了很多HttpException的子类，可以直接抛出。详见官网<a href="https://docs.nestjs.com/exception-filters" target="_blank" rel="noreferrer">https://docs.nestjs.com/exception-filters</a></p><p>如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> new BadRequestException(&#39;Something bad happened&#39;, { cause: new Error(), description: &#39;Some error description&#39; })</span></span></code></pre></div><p>返回结果如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;message&quot;: &quot;Something bad happened&quot;,</span></span>
<span class="line"><span>  &quot;error&quot;: &quot;Some error description&quot;,</span></span>
<span class="line"><span>  &quot;statusCode&quot;: 400,</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>这里再提示一下：如果response参数只是一个字符串，那返回体将会把status作为statusCode属性的值，会把options里的description作为error属性的值，如果response参数是一个对象，那返回体就只有这个对象里的属性</strong></p><h3 id="_3-异常过滤器exception-filters" tabindex="-1">3. 异常过滤器Exception filters <a class="header-anchor" href="#_3-异常过滤器exception-filters" aria-label="Permalink to &quot;3. 异常过滤器Exception filters&quot;">​</a></h3><p>如果想要更加个性化的定制Exception返回数据格式，可以使用Exception filters，下面是我自定义的HttpExceptionFilter，它需要实现ExceptionFilter接口，实现里面catch方法，并使用@Catch()装饰器进行修饰，它接收一个或多个参数，表明要捕获哪些异常.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import {</span></span>
<span class="line"><span>  Catch,</span></span>
<span class="line"><span>  ExceptionFilter,</span></span>
<span class="line"><span>  ArgumentsHost,</span></span>
<span class="line"><span>  HttpException,</span></span>
<span class="line"><span>} from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { Request, Response } from &#39;express&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Catch(HttpException)</span></span>
<span class="line"><span>export class httpExceptionFilter implements ExceptionFilter {</span></span>
<span class="line"><span>  catch(exception: HttpException, host: ArgumentsHost): any {</span></span>
<span class="line"><span>    // 拿到ctx对象</span></span>
<span class="line"><span>    const ctx = host.switchToHttp();</span></span>
<span class="line"><span>    const request = ctx.getRequest&lt;Request&gt;();</span></span>
<span class="line"><span>    const response = ctx.getResponse&lt;Response&gt;();</span></span>
<span class="line"><span>    const status = exception.getStatus();</span></span>
<span class="line"><span>    response.status(status).json({</span></span>
<span class="line"><span>      code: status,</span></span>
<span class="line"><span>      success: false,</span></span>
<span class="line"><span>      data: {</span></span>
<span class="line"><span>        requestQuery: request.query,</span></span>
<span class="line"><span>        requestParam: request.params,</span></span>
<span class="line"><span>        requestBody: request.body,</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      time: new Date().getTime(),</span></span>
<span class="line"><span>      url: request.url,</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>catch()方法的两个参数，其中host参数的类型为ArgumentHost，可以通过它拿到Request和Response对象，从而进行相应的操作。ArgumentHost是一个很丰富很复杂的接口，可以简单看一下它的定义，可以针对不同的请求协议拿到不同的host，这个以后有机会再研究。有兴趣的可以移步官网查看：<a href="https://docs.nestjs.com/fundamentals/execution-context" target="_blank" rel="noreferrer">https://docs.nestjs.com/fundamentals/execution-context</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * Provides methods for retrieving the arguments being passed to a handler.</span></span>
<span class="line"><span> * Allows choosing the appropriate execution context (e.g., Http, RPC, or</span></span>
<span class="line"><span> * WebSockets) to retrieve the arguments from.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * @publicApi</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>export interface ArgumentsHost {</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Returns the array of arguments being passed to the handler.</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    getArgs&lt;T extends Array&lt;any&gt; = any[]&gt;(): T;</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Returns a particular argument by index.</span></span>
<span class="line"><span>     * @param index index of argument to retrieve</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    getArgByIndex&lt;T = any&gt;(index: number): T;</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Switch context to RPC.</span></span>
<span class="line"><span>     * @returns interface with methods to retrieve RPC arguments</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    switchToRpc(): RpcArgumentsHost;</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Switch context to HTTP.</span></span>
<span class="line"><span>     * @returns interface with methods to retrieve HTTP arguments</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    switchToHttp(): HttpArgumentsHost;</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Switch context to WebSockets.</span></span>
<span class="line"><span>     * @returns interface with methods to retrieve WebSockets arguments</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    switchToWs(): WsArgumentsHost;</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Returns the current execution context type (string)</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    getType&lt;TContext extends string = ContextType&gt;(): TContext;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-使用filters" tabindex="-1">4. 使用filters <a class="header-anchor" href="#_4-使用filters" aria-label="Permalink to &quot;4. 使用filters&quot;">​</a></h3><h4 id="_1方法作用域" tabindex="-1">①方法作用域 <a class="header-anchor" href="#_1方法作用域" aria-label="Permalink to &quot;①方法作用域&quot;">​</a></h4><p>可以绑定到具体的方法上，使用@UseFilters(new HttpExceptionFilter())装饰器，可以传多个filter，<strong>亦可以使用类名作为参数，创建实例的事就交给nest框架帮我们处理，尽可能使用类作为参数，可以减小内存开支，因为全局公用一个实例instance</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Post()</span></span>
<span class="line"><span>@UseFilters(HttpExceptionFilter)</span></span>
<span class="line"><span>async create(@Body() createCatDto: CreateCatDto) {</span></span>
<span class="line"><span>  throw new ForbiddenException();</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_2controller作用域" tabindex="-1">②Controller作用域 <a class="header-anchor" href="#_2controller作用域" aria-label="Permalink to &quot;②Controller作用域&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@UseFilters(new HttpExceptionFilter())</span></span>
<span class="line"><span>export class CatsController {}</span></span></code></pre></div><h4 id="_3全局作用域" tabindex="-1">③全局作用域 <a class="header-anchor" href="#_3全局作用域" aria-label="Permalink to &quot;③全局作用域&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>async function bootstrap() {</span></span>
<span class="line"><span>  const app = await NestFactory.create(AppModule);</span></span>
<span class="line"><span>  app.useGlobalFilters(new HttpExceptionFilter());</span></span>
<span class="line"><span>  await app.listen(3000);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>bootstrap();</span></span></code></pre></div><p>我试验了一下，全局使用时不能使用类作为useGlobalFilters的参数</p><p>注意：当使用全局模式的时候，如果想用依赖注入的方式，必须使用特定的方式，在任意一个模块下使用如下方法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      provide: APP_FILTER,</span></span>
<span class="line"><span>      useClass: HttpExceptionFilter,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre></div><p>这跟后面要将的全局Guard类似</p><h3 id="_5-捕获所有异常" tabindex="-1">5. 捕获所有异常 <a class="header-anchor" href="#_5-捕获所有异常" aria-label="Permalink to &quot;5. 捕获所有异常&quot;">​</a></h3><p>@Catch()的参数列表为空时修饰的filter就是一个能捕获所有异常的filter，贴出官网的示例代码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import {</span></span>
<span class="line"><span>  ExceptionFilter,</span></span>
<span class="line"><span>  Catch,</span></span>
<span class="line"><span>  ArgumentsHost,</span></span>
<span class="line"><span>  HttpException,</span></span>
<span class="line"><span>  HttpStatus,</span></span>
<span class="line"><span>} from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { HttpAdapterHost } from &#39;@nestjs/core&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Catch()</span></span>
<span class="line"><span>export class AllExceptionsFilter implements ExceptionFilter {</span></span>
<span class="line"><span>  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  catch(exception: unknown, host: ArgumentsHost): void {</span></span>
<span class="line"><span>    // In certain situations \`httpAdapter\` might not be available in the</span></span>
<span class="line"><span>    // constructor method, thus we should resolve it here.</span></span>
<span class="line"><span>    const { httpAdapter } = this.httpAdapterHost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const ctx = host.switchToHttp();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const httpStatus =</span></span>
<span class="line"><span>      exception instanceof HttpException</span></span>
<span class="line"><span>        ? exception.getStatus()</span></span>
<span class="line"><span>        : HttpStatus.INTERNAL_SERVER_ERROR;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const responseBody = {</span></span>
<span class="line"><span>      statusCode: httpStatus,</span></span>
<span class="line"><span>      timestamp: new Date().toISOString(),</span></span>
<span class="line"><span>      path: httpAdapter.getRequestUrl(ctx.getRequest()),</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>使用的时候，可以给构造器传入一个httpAdapter参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>async function bootstrap() {</span></span>
<span class="line"><span>  const app = await NestFactory.create(AppModule);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const { httpAdapter } = app.get(HttpAdapterHost);</span></span>
<span class="line"><span>  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  await app.listen(3000);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>bootstrap();</span></span></code></pre></div><h3 id="_6-继承baseexceptionfilter" tabindex="-1">6.继承BaseExceptionFilter <a class="header-anchor" href="#_6-继承baseexceptionfilter" aria-label="Permalink to &quot;6.继承BaseExceptionFilter&quot;">​</a></h3><p>用于修改默认的内置全局异常，对于这种异常类，如果作用于方法或者Controller，则UseFilters()的参数只能使用类，让nest帮我们做剩下的事</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Catch, ArgumentsHost } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { BaseExceptionFilter } from &#39;@nestjs/core&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Catch()</span></span>
<span class="line"><span>export class AllExceptionsFilter extends BaseExceptionFilter {</span></span>
<span class="line"><span>  catch(exception: unknown, host: ArgumentsHost) {</span></span>
<span class="line"><span>    //....处理相关逻辑</span></span>
<span class="line"><span>    super.catch(exception, host);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>第5点和第6点其实都是全局异常，看你的业务进行相应的选择</p><h2 id="六、pipes" tabindex="-1">六、Pipes <a class="header-anchor" href="#六、pipes" aria-label="Permalink to &quot;六、Pipes&quot;">​</a></h2><p>A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.</p><p>管道也是一个类，使用装饰器@Injectable()，并实现接口PipeTransform</p><p>管道有两个典型的应用场景</p><ul><li>transformation：数据转换，如将请求的输入数据从string转为integer</li><li>validation：对请求的输入数据进行验证，验证不通过抛出异常，这一部分其实感觉也可以让前台来做</li></ul><p>以上两种场景下，管道都是对Controller控制器中的handler处理函数的参数进行操作，这个操作发生在handler函数真正执行之前，如果在pipes中抛出异常，会直接跳到异常处理，并返回前端，Controller下的处理函数压根不会执行，这也算是一种应用保护机制。</p><ul><li>如果是做validation，那么要么验证通过返回没有经过修改的value，要么验证失败，抛出错误</li><li>如果是transformation：那么转换为想要的类型，如果转换失败则抛出异常</li></ul><h3 id="_1-内置pipes" tabindex="-1">1. 内置pipes <a class="header-anchor" href="#_1-内置pipes" aria-label="Permalink to &quot;1. 内置pipes&quot;">​</a></h3><ul><li>ValidationPipe</li><li>ParseIntPipe</li><li>ParseFloatPipe</li><li>ParseBoolPipe</li><li>ParseArrayPipe</li><li>ParseUUIDPipe</li><li>ParseEnumPipe</li><li>DefaultValuePipe</li><li>ParseFilePipe</li></ul><h4 id="parse-pipe系列" tabindex="-1">Parse*Pipe系列 <a class="header-anchor" href="#parse-pipe系列" aria-label="Permalink to &quot;Parse*Pipe系列&quot;">​</a></h4><ul><li>使用类</li></ul><p>这一系列都是转换数据用的，可以在Controller的handler方法参数上使用，如下直接给@Param()提供第二个参数，用于转换，这里提供一个类，nest会自动将其实力为一个对象</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Get(&#39;hello/:id&#39;)</span></span>
<span class="line"><span>getHello(@Param(&#39;id&#39;, ParseIntPipe) id: number, @Request() req) {</span></span>
<span class="line"><span>  console.log(typeof id);</span></span>
<span class="line"><span>  return req.user;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>到请求为/hello/123时正常返回</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e9af5dd2dd14461b9e0724958b0cb60~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>当请求为/hello/123a时，转换出错，抛出异常</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdc65119443b4ea4895ac3073477b878~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><ul><li>使用自定义的实例</li></ul><p>如下自定义statuscode</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  getHello(</span></span>
<span class="line"><span>    @Param(</span></span>
<span class="line"><span>      &#39;id&#39;,</span></span>
<span class="line"><span>      new ParseIntPipe({</span></span>
<span class="line"><span>        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,</span></span>
<span class="line"><span>      }),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    id: number,</span></span>
<span class="line"><span>    @Request() req,</span></span>
<span class="line"><span>  ) {</span></span>
<span class="line"><span>    console.log(typeof id);</span></span>
<span class="line"><span>    return req.user;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01df501b269d44e1b92f2501e686938e~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h3 id="_2-自定义pipes-validation为例" tabindex="-1">2. 自定义Pipes(validation为例) <a class="header-anchor" href="#_2-自定义pipes-validation为例" aria-label="Permalink to &quot;2. 自定义Pipes(validation为例)&quot;">​</a></h3><p>不论是transformation还是validation都需要使用@Injectable()装饰器，并实现PipeTransform接口，基本实现如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { ArgumentMetadata, Injectable, PipeTransform } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class CustomValidationPipe implements PipeTransform {</span></span>
<span class="line"><span>  transform(value: any, metadata: ArgumentMetadata): any {</span></span>
<span class="line"><span>    console.log(&#39;====custom-pipe-value====&#39;, value);</span></span>
<span class="line"><span>    console.log(&#39;====custom-pipe-metadata====&#39;, metadata);</span></span>
<span class="line"><span>    return value;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>其中value就是被CustomValidationPipe修饰的参数，metadata是该参数的meta属性，它类型如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export interface ArgumentMetadata {</span></span>
<span class="line"><span>  type: &#39;body&#39; | &#39;query&#39; | &#39;param&#39; | &#39;custom&#39;;</span></span>
<span class="line"><span>  metatype?: Type&lt;unknown&gt;;</span></span>
<span class="line"><span>  data?: string;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h5 id="使用class-validator" tabindex="-1">使用class validator <a class="header-anchor" href="#使用class-validator" aria-label="Permalink to &quot;使用class validator&quot;">​</a></h5><p>官网上讲了好几种不同实现，我们主要看class validator，依托于class-validator和class-transformer，先安装依赖</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ npm i --save class-validator class-transformer</span></span></code></pre></div><p>对于我们新建用户来说，要校验创建用户的信息，对创建用户的Dto类使用class-validator的各种验证装饰器</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { IsOptional, IsString } from &#39;class-validator&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export class CreateUserDto {</span></span>
<span class="line"><span>  @IsString()</span></span>
<span class="line"><span>  username: string;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @IsString()</span></span>
<span class="line"><span>  password: string;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @IsString()</span></span>
<span class="line"><span>  @IsOptional()</span></span>
<span class="line"><span>  role?: string;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>编写validation-pipes类</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import {</span></span>
<span class="line"><span>  ArgumentMetadata,</span></span>
<span class="line"><span>  BadRequestException,</span></span>
<span class="line"><span>  Injectable,</span></span>
<span class="line"><span>  PipeTransform,</span></span>
<span class="line"><span>} from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { validate } from &#39;class-validator&#39;;</span></span>
<span class="line"><span>import { plainToInstance } from &#39;class-transformer&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class CustomValidationPipe implements PipeTransform&lt;any&gt; {</span></span>
<span class="line"><span>  async transform(value: any, metadata: ArgumentMetadata) {</span></span>
<span class="line"><span>    console.log(&#39;====custom-pipe-value====&#39;, value);</span></span>
<span class="line"><span>    console.log(&#39;====custom-pipe-metadata====&#39;, metadata);</span></span>
<span class="line"><span>    const { metatype } = metadata;</span></span>
<span class="line"><span>    // 判断传入的参数有没有类型，如果没有相当于是原生的js，则不做校验</span></span>
<span class="line"><span>    // 这里的类型指的就是Controller中的参数有没有指定类型，只有制定了类型的参数才需要校验</span></span>
<span class="line"><span>    if (!metatype || !this.toValidate(metatype)) {</span></span>
<span class="line"><span>      return value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 获取带有类型的obj对象</span></span>
<span class="line"><span>    const object = plainToInstance(metatype, value);</span></span>
<span class="line"><span>    // 校验</span></span>
<span class="line"><span>    const errors = await validate(object);</span></span>
<span class="line"><span>    // 如果校验出错，抛出异常</span></span>
<span class="line"><span>    if (errors.length &gt; 0) {</span></span>
<span class="line"><span>      throw new BadRequestException(&#39;Validation failed&#39;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 如果校验通过返回value unchanged</span></span>
<span class="line"><span>    return value;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  private toValidate(metatype: Function): boolean {</span></span>
<span class="line"><span>    const types: Function[] = [String, Boolean, Number, Array, Object];</span></span>
<span class="line"><span>    return !types.includes(metatype);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>使用：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  @Post()</span></span>
<span class="line"><span>  async create(@Body(new CustomValidationPipe()) createUserDto: CreateUserDto) {</span></span>
<span class="line"><span>    const newUser = await this.userService.create(createUserDto);</span></span>
<span class="line"><span>    this.logger.log(</span></span>
<span class="line"><span>      \`新建用户成功,用户名[\${newUser.username}],角色[\${newUser.role}]\`,</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>    return RespBean.success(newUser);</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>验证如下，将password写成了number而不是string</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcded6dddd6c4ce1a01c636dd0851bfa~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h3 id="_3-全局作用域下的pipes" tabindex="-1">3. 全局作用域下的pipes <a class="header-anchor" href="#_3-全局作用域下的pipes" aria-label="Permalink to &quot;3. 全局作用域下的pipes&quot;">​</a></h3><p>依然是两种形式</p><ul><li>使用useGlobalPipes</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  // 全局validationPipes</span></span>
<span class="line"><span>  app.useGlobalPipes(new CustomValidationPipe());</span></span></code></pre></div><ul><li>使用依赖注入，在任意一个模块注入都可以</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      provide: APP_PIPE,</span></span>
<span class="line"><span>      useClass: CustomValidationPipe,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre></div><h3 id="_4-内置validationpipe" tabindex="-1">4. 内置validationPipe <a class="header-anchor" href="#_4-内置validationpipe" aria-label="Permalink to &quot;4. 内置validationPipe&quot;">​</a></h3><p>当然讲了这么多，只是说明了原理，其实我们大可不必自己写，直接使用内置的就行，而且提供了丰富的配置自定义功能，具体详情可移步官网：<a href="https://docs.nestjs.com/techniques/validation" target="_blank" rel="noreferrer">https://docs.nestjs.com/techniques/validation</a></p><p>基本使用：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { ValidationPipe } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app.useGlobalPipes(</span></span>
<span class="line"><span>  new ValidationPipe({</span></span>
<span class="line"><span>    disableErrorMessages: true,</span></span>
<span class="line"><span>  }),</span></span>
<span class="line"><span>);</span></span></code></pre></div><h3 id="_5-transformation-pipes自定义使用场景" tabindex="-1">5. transformation-pipes自定义使用场景 <a class="header-anchor" href="#_5-transformation-pipes自定义使用场景" aria-label="Permalink to &quot;5. transformation-pipes自定义使用场景&quot;">​</a></h3><p>我们也可以自定义transformation pipes，这个很简单，就是在transform方法内返回不同的结果就行了，它会覆盖之前的value，这是对前端传值的干预，有时候也会很有用</p><ul><li>比如将数据类型进行转换</li><li>对需要的数据如果某个属性不存在那就给它一个默认值，比如做查询操作的时候，有些查询参数没传那就使用默认值</li></ul><p>官网示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class ParseIntPipe implements PipeTransform&lt;string, number&gt; {</span></span>
<span class="line"><span>  transform(value: string, metadata: ArgumentMetadata): number {</span></span>
<span class="line"><span>    const val = parseInt(value, 10);</span></span>
<span class="line"><span>    if (isNaN(val)) {</span></span>
<span class="line"><span>      throw new BadRequestException(&#39;Validation failed&#39;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return val;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>注意这里PipeTransform&lt;T, R&gt;泛型的使用，T表示输入的类型，R表示返回的类型</p><p>使用和之前讲的一样：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Get(&#39;:id&#39;)</span></span>
<span class="line"><span>async findOne(@Param(&#39;id&#39;, new ParseIntPipe()) id) {</span></span>
<span class="line"><span>  return this.catsService.findOne(id);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_6-实现id转user实体的transformation-pipe" tabindex="-1">6. 实现id转user实体的transformation pipe <a class="header-anchor" href="#_6-实现id转user实体的transformation-pipe" aria-label="Permalink to &quot;6. 实现id转user实体的transformation pipe&quot;">​</a></h3><p>这里实现一下官网上的另外一个留给读者的例子，就是前端传入的是一个userId，我们需要在transformation pipe中根据这个id来返回一个用户对象，也就是将id转换为用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { ArgumentMetadata, Injectable, PipeTransform } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { UserService } from &#39;../../modules/user/user.service&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class UserByIdPipe implements PipeTransform&lt;any&gt; {</span></span>
<span class="line"><span>  constructor(private readonly userService: UserService) {}</span></span>
<span class="line"><span>  async transform(value: string, metadata: ArgumentMetadata) {</span></span>
<span class="line"><span>    const value1 = parseInt(value, 10);</span></span>
<span class="line"><span>    // 这里从数据库查找user，我使用的是prisma</span></span>
<span class="line"><span>    const user = await this.userService.findOneById(value1);</span></span>
<span class="line"><span>    if (user) {</span></span>
<span class="line"><span>      // 去除密码</span></span>
<span class="line"><span>      const { password, ...res } = user;</span></span>
<span class="line"><span>      return res;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>使用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Get(&#39;users/:id&#39;)</span></span>
<span class="line"><span>getUser(@Param(&#39;id&#39;, UserByIdPipe) user: User) {</span></span>
<span class="line"><span>  return user;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>测试</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/695b8739bce240d8b338c6a4029b7fff~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h3 id="_7-pipe提供默认值" tabindex="-1">7. pipe提供默认值 <a class="header-anchor" href="#_7-pipe提供默认值" aria-label="Permalink to &quot;7. pipe提供默认值&quot;">​</a></h3><p>主要用在前端传过来的数据是null或者undefined，如果我们不做处理可能会抛出异常，所以我们可以在他们转换前再加一层提供默认值的管道，较为简单，直接引用官方的示例</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Get()</span></span>
<span class="line"><span>async findAll(</span></span>
<span class="line"><span>  @Query(&#39;activeOnly&#39;, new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,</span></span>
<span class="line"><span>  @Query(&#39;page&#39;, new DefaultValuePipe(0), ParseIntPipe) page: number,</span></span>
<span class="line"><span>) {</span></span>
<span class="line"><span>  return this.catsService.findAll({ activeOnly, page });</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="七、guards" tabindex="-1">七、Guards <a class="header-anchor" href="#七、guards" aria-label="Permalink to &quot;七、Guards&quot;">​</a></h2><p>A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface.</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd51a71392a74fc08dab8ae87b427011~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>字面理解就是守卫，它最突出的作用就是用来做鉴权，就是来决定一个请求是否被处理及怎么处理，这依赖于一定的条件，比如权限、角色等等，它和用户权限挂钩。可能有的同志回想用中间件来处理，中间件对一般的要求还可以做到，但是对一些复杂需求，比如不同权限接下去要进行的操作是不一样的，我们使用中间件仅仅靠一个next函数是没法精确控制下一步往哪里走的。</p><p>Guards的执行顺序在所有的中间件之后，但是在任何的interceptor和pipe之前</p><h3 id="_1-基本示例代码" tabindex="-1">1. 基本示例代码 <a class="header-anchor" href="#_1-基本示例代码" aria-label="Permalink to &quot;1. 基本示例代码&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Injectable, CanActivate, ExecutionContext } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { Observable } from &#39;rxjs&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class AuthGuard implements CanActivate {</span></span>
<span class="line"><span>  canActivate(</span></span>
<span class="line"><span>    context: ExecutionContext,</span></span>
<span class="line"><span>  ): boolean | Promise&lt;boolean&gt; | Observable&lt;boolean&gt; {</span></span>
<span class="line"><span>    const request = context.switchToHttp().getRequest();</span></span>
<span class="line"><span>    return validateRequest(request);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>使用@Injectable装饰器，实现CanActivate接口</li><li>canActivate方法，重点关注context执行上下文对象，比较强大。</li><li>方法返回true继续执行，返回false拒绝该次请求</li></ul><h3 id="_2-execution-context" tabindex="-1">2. Execution context <a class="header-anchor" href="#_2-execution-context" aria-label="Permalink to &quot;2. Execution context&quot;">​</a></h3><p>继承自ArgumentHost，详情见官网：<a href="https://docs.nestjs.com/fundamentals/execution-context" target="_blank" rel="noreferrer">https://docs.nestjs.com/fundamentals/execution-context</a></p><p>Nest提供了很多实用的工具类来帮我们更轻松的编写应用，Execution context就是其一，后面单独开一篇来将ArgumentsHost和ExecutionContext。</p><h3 id="_3-基于role的权限认证" tabindex="-1">3.基于Role的权限认证 <a class="header-anchor" href="#_3-基于role的权限认证" aria-label="Permalink to &quot;3.基于Role的权限认证&quot;">​</a></h3><p>这里主要讲一个东西就是@SetMetadata的使用，这是用来添加元数据的，我们想实现的功能大概如下：</p><p>在Controller或method-handler上加一个类似Roles(&#39;admin&#39;)装饰器，让只具有admin角色的用户能够访问和调用，如下表示只有admin权限的用户才有资格访问：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Post()</span></span>
<span class="line"><span>@Roles(&#39;admin&#39;)</span></span>
<span class="line"><span>async create(@Body() createCatDto: CreateCatDto) {</span></span>
<span class="line"><span>  this.catsService.create(createCatDto);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如何做到这一点呢?先来个思路分析</p><p>我们在canActivate方法中需要做一下几个事情：</p><ul><li>一是获取当前登录用户的role角色信息，这个可以通过contex拿到request，一般我们会在认证那一步就将user信息附加到request上，这样我们直接通过request.user即可拿到user信息，详见我的系列第一篇，主要就是将用户认证的<a href="https://juejin.cn/post/7171424088827625479" target="_blank" rel="noreferrer">https://juejin.cn/post/7171424088827625479</a></li><li>二是要获取到@Roles()装饰器的参数信息，即标示了哪些用户角色可以访问，这就需要用到两个东西：①Roles装饰器需要自定义，通过对@SetMetadata进行一层包裹，对所装饰的Controller或method添加元数据；②Nest框架给我们提供的反射类，通过反射类拿到装饰器内的参数</li></ul><p>具体做法如下：</p><p>自定义@Roles装饰器</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { SetMetadata } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const Roles = (...roles: string[]) =&gt; SetMetadata(&#39;roles&#39;, roles);</span></span></code></pre></div><p>构造一个Guard</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Injectable, CanActivate, ExecutionContext } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { Reflector } from &#39;@nestjs/core&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class RolesGuard implements CanActivate {</span></span>
<span class="line"><span>  constructor(private reflector: Reflector) {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  canActivate(context: ExecutionContext): boolean {</span></span>
<span class="line"><span>    // 通过反射拿到，context.getHandler()拿到的是装饰的那个route handler</span></span>
<span class="line"><span>    // 而roles信息就放在Controller的元数据对象上</span></span>
<span class="line"><span>    const roles = this.reflector.get&lt;string[]&gt;(&#39;roles&#39;, context.getHandler());</span></span>
<span class="line"><span>    if (!roles) {</span></span>
<span class="line"><span>      return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    const request = context.switchToHttp().getRequest();</span></span>
<span class="line"><span>    // user在这里获取，其实在用户登录的时候会把用户信息都藏到token里，每次用户登录携带token</span></span>
<span class="line"><span>    // 应用在认证token的同时就把用户user信息附加到request中了，认证在这之前所以这里可以拿到</span></span>
<span class="line"><span>    const user = request.user;</span></span>
<span class="line"><span>    return matchRoles(roles, user.roles);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>对于鉴权后的一些操作，可以根据自己的业务逻辑需要进行定制，至此，Guard基本也讲完了。</p><h2 id="八、interceptors" tabindex="-1">八、Interceptors <a class="header-anchor" href="#八、interceptors" aria-label="Permalink to &quot;八、Interceptors&quot;">​</a></h2><p>An interceptor is a class annotated with the @Injectable() decorator and implements the NestInterceptor interface.</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6e1e9ce0fad4132abc21760b1bd3cef~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>拦截器！面向切面编程，具有以下能力：</p><ul><li>在某个方法执行前后增加额外逻辑</li><li>修改一个方法返回的结果</li><li>修改一个方法抛出的错误</li><li>扩展一个方法的功能</li><li>根据某些特别的条件，重写一个方法，比如为了缓存目的</li></ul><h3 id="_1-实现接口及方法参数解析" tabindex="-1">1. 实现接口及方法参数解析 <a class="header-anchor" href="#_1-实现接口及方法参数解析" aria-label="Permalink to &quot;1. 实现接口及方法参数解析&quot;">​</a></h3><p>每一个拦截器都需要实现一个NestInterceptor接口，实现里面的intercept方法，接口定义如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * Interface describing implementation of an interceptor.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * @see [Interceptors](https://docs.nestjs.com/interceptors)</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * @publicApi</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>export interface NestInterceptor&lt;T = any, R = any&gt; {</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Method to implement a custom interceptor.</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * @param context an \`ExecutionContext\` object providing methods to access the</span></span>
<span class="line"><span>     * route handler and class about to be invoked.</span></span>
<span class="line"><span>     * @param next a reference to the \`CallHandler\`, which provides access to an</span></span>
<span class="line"><span>     * \`Observable\` representing the response stream from the route handler.</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    intercept(context: ExecutionContext, next: CallHandler&lt;T&gt;): Observable&lt;R&gt; | Promise&lt;Observable&lt;R&gt;&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>主要看需要实现的intercept方法，它有两个参数context和next</p><h4 id="_1executioncontext" tabindex="-1">①ExecutionContext <a class="header-anchor" href="#_1executioncontext" aria-label="Permalink to &quot;①ExecutionContext&quot;">​</a></h4><p>继承自ArgumentsHost，可以获取执行上下文，有自己的扩展，可以通过反射机制使用getClass()和getHandler()拿到class和method，详情</p><h4 id="_2callhandler" tabindex="-1">②CallHandler <a class="header-anchor" href="#_2callhandler" aria-label="Permalink to &quot;②CallHandler&quot;">​</a></h4><p>CallHandler是一个接口，实现了handle方法，接口如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * Interface providing access to the response stream.</span></span>
<span class="line"><span> * @see [Interceptors](https://docs.nestjs.com/interceptors)</span></span>
<span class="line"><span> * @publicApi</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>export interface CallHandler&lt;T = any&gt; {</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Returns an \`Observable\` representing the response stream from the route</span></span>
<span class="line"><span>     * handler.</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    handle(): Observable&lt;T&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以看出，该接口提供了访问Response流的能力，handle()函数的返回值就是response流，类型是一个<code>Observable&lt;T&gt;</code>类型（Observable这是rxjs的内容了，后面有机会单独开一个rxjs的系列，这也是一个非常强大的库，在帮我们处理异步事件的时候用处很大，有兴趣的可移步官网提前学习：<a href="https://rxjs.dev/guide/overview" target="_blank" rel="noreferrer">https://rxjs.dev/guide/overview</a>），你可以在合适的位置使用它来调用你的route handler，如果在intercept()方法的实现中没有调用过handle()方法，那么route handler将不会被执行。</p><p><strong>调用handle()方法前的处理逻辑相当与在route handler之前添加的逻辑，在handle()方法执行后的逻辑相当于在route handler之后添加的逻辑，实现了对route handler的拦截。</strong></p><h3 id="_2-简单示例" tabindex="-1">2. 简单示例 <a class="header-anchor" href="#_2-简单示例" aria-label="Permalink to &quot;2. 简单示例&quot;">​</a></h3><p>我们做一个日志相关的拦截器，实现的目的是route handler处理前记录时间并打印一段提示信息，处理之后打印另一段提示信息并记录route handler的执行时长</p><h4 id="构建拦截器" tabindex="-1">构建拦截器 <a class="header-anchor" href="#构建拦截器" aria-label="Permalink to &quot;构建拦截器&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class LoggingInterceptor implements NestInterceptor {</span></span>
<span class="line"><span>  intercept(</span></span>
<span class="line"><span>    context: ExecutionContext,</span></span>
<span class="line"><span>    next: CallHandler&lt;any&gt;,</span></span>
<span class="line"><span>  ): Observable&lt;any&gt; | Promise&lt;Observable&lt;any&gt;&gt; {</span></span>
<span class="line"><span>    // 处理route handler前的逻辑</span></span>
<span class="line"><span>    console.log(&#39;Before...&#39;);</span></span>
<span class="line"><span>    const now = Date.now();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return next</span></span>
<span class="line"><span>      .handle().pipe(</span></span>
<span class="line"><span>        tap((value) =&gt;</span></span>
<span class="line"><span>          console.log(\`After...\${Date.now() - now}ms, return value: \${value}\`),</span></span>
<span class="line"><span>        ),</span></span>
<span class="line"><span>      );</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="绑定拦截器" tabindex="-1">绑定拦截器 <a class="header-anchor" href="#绑定拦截器" aria-label="Permalink to &quot;绑定拦截器&quot;">​</a></h4><p>和pipes和guards一样，可以绑定到Controller层、method层以及全局作用域，下面绑定到method层面，使用@UseInterceptors拦截器</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  @UseInterceptors(LoggingInterceptor)</span></span>
<span class="line"><span>  @Get(&#39;interceptor/test&#39;)</span></span>
<span class="line"><span>  testInterceptor() {</span></span>
<span class="line"><span>    return &#39;hello interceptor&#39;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>测试结果</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fd4e37dbe8d46f392991b68006c7279~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p><strong>如果要绑定全局作用域，可以使用如下两种方式</strong></p><ul><li>useGlobalInterceptors</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>app.useGlobalInterceptors(new LoggingInterceptor());</span></span></code></pre></div><ul><li>依赖注入方式</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      provide: APP_INTERCEPTOR,</span></span>
<span class="line"><span>      useClass: LoggingInterceptor,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre></div><p><strong>其实我们可以总结一下关于绑定的方式，我将在核心概念的最后一篇进行一个梳理，对所有涉及到的使用方式做一个总结，其实我个人比较推荐统一都使用注入的方式。</strong></p><h3 id="_3-response结果转换" tabindex="-1">3. response结果转换 <a class="header-anchor" href="#_3-response结果转换" aria-label="Permalink to &quot;3. response结果转换&quot;">​</a></h3><p>由上面可知，我们通过handle()方法拿到了响应流的Observable对象，进而可以对结果进行各种修改转换操作。但是有一点要注意：当route handler中接收 @Res装饰器装饰的参数时不能使用。经过我的测试，发现这么做会阻塞整个请求</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa868fe9ed064b44bf615c4775e3db01~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>做数据转换的拦截器很简单，只需要在pipe管道中进行map操作就行，可以参考官方的示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export interface Response&lt;T&gt; {</span></span>
<span class="line"><span>  data: T;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class TransformInterceptor&lt;T&gt; implements NestInterceptor&lt;T, Response&lt;T&gt;&gt; {</span></span>
<span class="line"><span>  intercept(context: ExecutionContext, next: CallHandler): Observable&lt;Response&lt;T&gt;&gt; {</span></span>
<span class="line"><span>    return next.handle().pipe(map(data =&gt; ({ data })));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>提示一下，intercept方法依然可以是同步也可以是异步</p><p>map操作可以做任意转换，如：</p><ul><li>将值转换成一个对象</li><li>将null值转换默认的空字符串</li><li>对Exception的转换</li></ul><p>具体的就不做演示了，这个大家应该很熟悉，和js中的map高阶函数一个道理</p><h3 id="_4-结果覆盖" tabindex="-1">4. 结果覆盖 <a class="header-anchor" href="#_4-结果覆盖" aria-label="Permalink to &quot;4. 结果覆盖&quot;">​</a></h3><p>说白了就是某些情况我们不在调用handle处理，为什么呢？可能有时候是多余的，比如结果已经在缓存中有，我们直接在缓存中提取就好了，不用做重复的处理，这可以大大提升性能和响应速度。伪代码逻辑大概如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const isCached = true;</span></span>
<span class="line"><span>if (isCached) {</span></span>
<span class="line"><span>  return of(缓存中的数据);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>return next.handle();</span></span></code></pre></div><h3 id="_5-其它操作" tabindex="-1">5. 其它操作 <a class="header-anchor" href="#_5-其它操作" aria-label="Permalink to &quot;5. 其它操作&quot;">​</a></h3><p>我们可以充分利用rxjs的强大处理能力，实现更丰富的功能，官方举了一个例子，就是请求处理超时抛出错误的例子，可以参考一下代码，只截取了一部分，pipe中的操作是，超时5s就抛出异常取消该次请求</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>return next.handle().pipe(</span></span>
<span class="line"><span>      timeout(5000),</span></span>
<span class="line"><span>      catchError(err =&gt; {</span></span>
<span class="line"><span>        if (err instanceof TimeoutError) {</span></span>
<span class="line"><span>          return throwError(() =&gt; new RequestTimeoutException());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return throwError(() =&gt; err);</span></span>
<span class="line"><span>      }),</span></span>
<span class="line"><span>    );</span></span></code></pre></div><h2 id="九、custom-decorators" tabindex="-1">九、Custom decorators <a class="header-anchor" href="#九、custom-decorators" aria-label="Permalink to &quot;九、Custom decorators&quot;">​</a></h2><p>装饰器这个概念对JavaScript来说感觉是一次小小的革新，非常好用，其实所谓的装饰器就是一个函数，@的写法是一个语法糖，它可以修饰类、方法、属性及参数，看一下es源码</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61f4971c974f40c49f7e9c82c664d1af~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>nest为我们内置了很多装饰器，各个层面的都有，我们定义类的时候用的最多的就是@Injectable了吧，哈哈，下面我们来自定义一些装饰器，非常好用！</p><h3 id="_1-参数级别装饰器" tabindex="-1">1. 参数级别装饰器 <a class="header-anchor" href="#_1-参数级别装饰器" aria-label="Permalink to &quot;1. 参数级别装饰器&quot;">​</a></h3><p>我们在一个系统登录认证后，token里的user信息都会被附加到request中，我们可以做一个参数装饰器直接获取当前请求携带的user，具体做法如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createParamDecorator, ExecutionContext } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { Request } from &#39;express&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const UserDecorator = createParamDecorator(</span></span>
<span class="line"><span>  (data: unknown, ctx: ExecutionContext) =&gt; {</span></span>
<span class="line"><span>    const request = ctx.switchToHttp().getRequest&lt;Request&gt;();</span></span>
<span class="line"><span>    return request.user;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>);</span></span></code></pre></div><p>使用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  @Get(&#39;userDec/test&#39;)</span></span>
<span class="line"><span>  testUserDecorator(@UserDecorator() user) {</span></span>
<span class="line"><span>    console.log(user);</span></span>
<span class="line"><span>    return \`hello \${user.username}\`;</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b4d6ea782f340ca93a64ed019fc5548~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>当然这个的前提是你request中得有user啊，这就涉及到认证相关的内容了，可以移步我的nestjs系列第一篇查看：<a href="https://juejin.cn/post/7171424088827625479" target="_blank" rel="noreferrer">https://juejin.cn/post/7171424088827625479</a></p><h3 id="_2-给装饰器传参" tabindex="-1">2. 给装饰器传参 <a class="header-anchor" href="#_2-给装饰器传参" aria-label="Permalink to &quot;2. 给装饰器传参&quot;">​</a></h3><p>给装饰器传参会放到factory方法的data域中，比如我们想给上面的User装饰器传一个属性名username直接获取用户的username，可以这么做：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export const UserDecorator = createParamDecorator(</span></span>
<span class="line"><span>  (data: string, ctx: ExecutionContext) =&gt; {</span></span>
<span class="line"><span>    const request = ctx.switchToHttp().getRequest&lt;Request&gt;();</span></span>
<span class="line"><span>    const user = request.user;</span></span>
<span class="line"><span>    return data ? user?.[data] : user;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>);</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  @Get(&#39;userDec/test&#39;)</span></span>
<span class="line"><span>  testUserDecorator(@UserDecorator(&#39;username&#39;) user) {</span></span>
<span class="line"><span>    console.log(user); // coderlj</span></span>
<span class="line"><span>    return \`hello \${user}\`; // hello coderlj</span></span>
<span class="line"><span>  }</span></span></code></pre></div><h3 id="_3-结合pipes" tabindex="-1">3. 结合pipes <a class="header-anchor" href="#_3-结合pipes" aria-label="Permalink to &quot;3. 结合pipes&quot;">​</a></h3><p>可以对自定义的装饰器的参数进行校验，下面使用的是框架自带的ValidationPipe</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Get()</span></span>
<span class="line"><span>async findOne(</span></span>
<span class="line"><span>  @User(new ValidationPipe({ validateCustomDecorators: true }))</span></span>
<span class="line"><span>  user: UserEntity,</span></span>
<span class="line"><span>) {</span></span>
<span class="line"><span>  console.log(user);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-装饰器组合封装" tabindex="-1">4. 装饰器组合封装 <a class="header-anchor" href="#_4-装饰器组合封装" aria-label="Permalink to &quot;4. 装饰器组合封装&quot;">​</a></h3><p>有时候，我们对一个东西加的装饰器很多，看着代码非常复杂，可以进行抽取重构，将一些经常使用作用可以聚合的放在一起，最后实现用一个装饰器实现对好几个装饰器的封装，如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { applyDecorators } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function Auth(...roles: Role[]) {</span></span>
<span class="line"><span>  return applyDecorators(</span></span>
<span class="line"><span>    SetMetadata(&#39;roles&#39;, roles),</span></span>
<span class="line"><span>    UseGuards(AuthGuard, RolesGuard),</span></span>
<span class="line"><span>    ApiBearerAuth(),</span></span>
<span class="line"><span>    ApiUnauthorizedResponse({ description: &#39;Unauthorized&#39; }),</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>使用的时候只需要用一个就行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Get(&#39;users&#39;)</span></span>
<span class="line"><span>@Auth(&#39;admin&#39;)</span></span>
<span class="line"><span>findAllUsers() {}</span></span></code></pre></div>`,314),l=[t];function i(o,c,r,d,u,h){return a(),n("div",null,l)}const b=s(e,[["render",i]]);export{m as __pageData,b as default};
