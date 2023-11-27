import{_ as s,o as a,c as n,R as p}from"./chunks/framework.KB1hzIC4.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/backend/nestjs/安全认证/1.登录认证(JWT).md","filePath":"articles/backend/nestjs/安全认证/1.登录认证(JWT).md","lastUpdated":1701094652000}'),e={name:"articles/backend/nestjs/安全认证/1.登录认证(JWT).md"},t=p(`<blockquote><p>该文可以说是对照官网的学习笔记，使用流行的passport，顺序有所改变，关于自定义Passport认证的方法，我总结了一下：<strong>先注册导入相应xxxModule，提供对应xxxStrategy，构建对应xxxAuthGuard，最后直接使用UseGuards()</strong></p></blockquote><ul><li>对于passport-local验证：导入PassportModule，提供LocalStrategy，构建LocalAuthGuard，使用UseGuards(LocalAuthGuard)</li><li>对于passport-jwt验证：导入JwtModule，提供JwtStrategy，构建JwtAuthGuard，使用UseGuards(JwtAuthGuard)</li></ul><h2 id="一、安装相应依赖" tabindex="-1">一、安装相应依赖 <a class="header-anchor" href="#一、安装相应依赖" aria-label="Permalink to &quot;一、安装相应依赖&quot;">​</a></h2><p>nestjs有自己封装好的库，这里吧passport-local用到的库一并安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ npm install --save @nestjs/passport passport passport-local</span></span>
<span class="line"><span>$ npm install --save-dev @types/passport-local</span></span></code></pre></div><p>原生的passport需要提供两个东西：</p><ul><li>针对特定的策略，提供一系列配置，如jwt需要一个secret密钥用来生成token</li><li>一个验证的回调函数，验证通过返回整个用户信息，验证错误返回null，验证错误可以是用户没找到或者用户密码不匹配</li></ul><p>使用@nestjs/passport，通过创建一个类继承PassportStrategy(Stratery, name?)，通过super()方法传入配置信息(对应步骤1)，在该类中实现validate()方法用来做验证(对应步骤2)</p><h2 id="二、使用passport-local步骤" tabindex="-1">二、使用passport-local步骤 <a class="header-anchor" href="#二、使用passport-local步骤" aria-label="Permalink to &quot;二、使用passport-local步骤&quot;">​</a></h2><h3 id="_1-新建auth-module、auth-service" tabindex="-1">1. 新建auth-module、auth-service <a class="header-anchor" href="#_1-新建auth-module、auth-service" aria-label="Permalink to &quot;1. 新建auth-module、auth-service&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ nest g module auth</span></span>
<span class="line"><span>$ nest g service auth</span></span></code></pre></div><h3 id="_2-导入相应module" tabindex="-1">2. 导入相应Module <a class="header-anchor" href="#_2-导入相应module" aria-label="Permalink to &quot;2. 导入相应Module&quot;">​</a></h3><p>增加PassportModule，使用Passport的一系列特性</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { AuthService } from &#39;./auth.service&#39;;</span></span>
<span class="line"><span>import { PassportModule } from &#39;@nestjs/passport&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [UserModule, PassportModule],</span></span>
<span class="line"><span>  providers: [AuthService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AuthModule {}</span></span></code></pre></div><h4 id="在authmodule中引入userservice" tabindex="-1">在AuthModule中引入UserService <a class="header-anchor" href="#在authmodule中引入userservice" aria-label="Permalink to &quot;在AuthModule中引入UserService&quot;">​</a></h4><p>这样就可以使用UserService，官网上的做法是直接在imports中导入了UserModule，在我看来，这里只是需要使用UserService提供的方法，感觉没必要导入，提供一个UserService就够了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  ...,</span></span>
<span class="line"><span>  providers: [AuthService，UserService],</span></span>
<span class="line"><span>})</span></span></code></pre></div><h4 id="编写auth-service-ts" tabindex="-1">编写auth.service.ts <a class="header-anchor" href="#编写auth-service-ts" aria-label="Permalink to &quot;编写auth.service.ts&quot;">​</a></h4><p>注意：这一步其实并不是必须的步骤，只是为把后面策略中验证用户名密码的代码单独剥离出来而已，这个Service中涉及到操作数据库，我们一般习惯把直接跟数据库打交道的都放到Service中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Injectable, Logger } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { UserService } from &#39;../user/user.service&#39;;</span></span>
<span class="line"><span>import * as bcrypt from &#39;bcrypt&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class AuthService {</span></span>
<span class="line"><span>  constructor(</span></span>
<span class="line"><span>    private readonly userService: UserService,</span></span>
<span class="line"><span>    private readonly logger: Logger,</span></span>
<span class="line"><span>  ) {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span> async validateUser(username: string, pass: string) {</span></span>
<span class="line"><span>     //这里是连接了数据库，根据username查找用户的操作，练习时可以硬编码</span></span>
<span class="line"><span>    const user = await this.userService.findOneByUsername(username);</span></span>
<span class="line"><span>    if (user) {</span></span>
<span class="line"><span>      const match = await bcrypt.compare(pass, user.password);</span></span>
<span class="line"><span>      if (match) {</span></span>
<span class="line"><span>        this.logger.log(&#39;用户名密码认证成功&#39;);</span></span>
<span class="line"><span>        const { password, ...result } = user;</span></span>
<span class="line"><span>        return result;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      this.logger.error(&#39;密码错误.&#39;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    this.logger.error(&#39;用户名密码认证失败&#39;);</span></span>
<span class="line"><span>    return null;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-提供策略" tabindex="-1">3. 提供策略 <a class="header-anchor" href="#_3-提供策略" aria-label="Permalink to &quot;3. 提供策略&quot;">​</a></h3><p>也就是开篇讲的那两点，编写一个类，实现一个方法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Strategy } from &#39;passport-local&#39;;</span></span>
<span class="line"><span>import { Injectable, UnauthorizedException } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { PassportStrategy } from &#39;@nestjs/passport&#39;;</span></span>
<span class="line"><span>import { AuthService } from &#39;./auth.service&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// name: &#39;local&#39; 默认值，也可以自定义</span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class LocalStrategy extends PassportStrategy(Strategy, &#39;local&#39;) {</span></span>
<span class="line"><span>  constructor(private authService: AuthService) {</span></span>
<span class="line"><span>     // 这里默认不用配置，假设的是你的User实体中属性名为username和password</span></span>
<span class="line"><span>     // 如果不是的话，需要手动指定是usernameField:xx和passwordField:xxx</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  async validate(username: string, password: string) {</span></span>
<span class="line"><span>    const user = this.authService.validateUser(username, password);</span></span>
<span class="line"><span>    if (!user) {</span></span>
<span class="line"><span>      throw new UnauthorizedException();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return user;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-创建guard" tabindex="-1">4. 创建Guard <a class="header-anchor" href="#_4-创建guard" aria-label="Permalink to &quot;4. 创建Guard&quot;">​</a></h3><p>构建一个LocalAuthGuard</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Injectable } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { AuthGuard } from &#39;@nestjs/passport&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class LocalAuthGuard extends AuthGuard(&#39;local&#39;) {}</span></span></code></pre></div><h3 id="_5-使用" tabindex="-1">5. 使用 <a class="header-anchor" href="#_5-使用" aria-label="Permalink to &quot;5. 使用&quot;">​</a></h3><p>直接使用UseGuards(填写对应的Guard)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Controller, Get, Post, Request, UseGuards } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { AppService } from &#39;./app.service&#39;;</span></span>
<span class="line"><span>import { LocalAuthGuard } from &#39;./auth/local-auth.guard&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Controller()</span></span>
<span class="line"><span>export class AppController {</span></span>
<span class="line"><span>  constructor(private readonly appService: AppService) {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @UseGuards(LocalAuthGuard)</span></span>
<span class="line"><span>  @Post(&#39;auth/login&#39;)</span></span>
<span class="line"><span>  async login(@Request() req) {</span></span>
<span class="line"><span>    return req.user;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>使用了UseGuards后，会自动进行验证，Passprot会自动创建一个user的object放到req上，这个object其实就是我们编写的那个类中实现的validate方法返回的user</p><h4 id="验证" tabindex="-1">验证 <a class="header-anchor" href="#验证" aria-label="Permalink to &quot;验证&quot;">​</a></h4><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66f90ec964ca4853a2dd79b72785b8b9~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/403ca438da7f4c439a4217b64ca5e1a4~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h2 id="三、jwt的使用" tabindex="-1">三、JWT的使用 <a class="header-anchor" href="#三、jwt的使用" aria-label="Permalink to &quot;三、JWT的使用&quot;">​</a></h2><p>jwt其实就是登录的时候将用户名(或其他想放进去的信息)配合一个密钥生成一个token，返回给前端，前端保留在某个位置，前端之后发起的请求都带着这个token来，后端进行相应的鉴权响应</p><p>先安装依赖包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ npm install --save @nestjs/jwt passport-jwt</span></span>
<span class="line"><span>$ npm install --save-dev @types/passport-jwt</span></span></code></pre></div><p>步骤分为一下几步：</p><h3 id="_1-导入jwtmodule" tabindex="-1">1. 导入JwtModule <a class="header-anchor" href="#_1-导入jwtmodule" aria-label="Permalink to &quot;1. 导入JwtModule&quot;">​</a></h3><p>在auth-module的imports中引入注册JwtModule，配置相关信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>imports:[</span></span>
<span class="line"><span>  ...,</span></span>
<span class="line"><span>  JwtModule.register({</span></span>
<span class="line"><span>    secret: jwtConstants.secret,</span></span>
<span class="line"><span>    signOptions: {</span></span>
<span class="line"><span>      expiresIn: &#39;4h&#39;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  }),</span></span>
<span class="line"><span>  ]</span></span></code></pre></div><h3 id="_2-提供jwt验证策略" tabindex="-1">2. 提供Jwt验证策略 <a class="header-anchor" href="#_2-提供jwt验证策略" aria-label="Permalink to &quot;2. 提供Jwt验证策略&quot;">​</a></h3><p>需要在auth-module的providers的中提供相应的策略，但是我们现在还没有，所以下一步是创建jwt验证策略JwtStrategy，它需要继承PassportStrategy(Strategy, name?)，其中Strategy来自于passport-jwt，name是可选的，默认是jwt，</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { ExtractJwt, Strategy } from &#39;passport-jwt&#39;;</span></span>
<span class="line"><span>import { PassportStrategy } from &#39;@nestjs/passport&#39;;</span></span>
<span class="line"><span>import { Injectable } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { jwtConstants } from &#39;./constants&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class JwtStrategy extends PassportStrategy(Strategy, &#39;customJwt&#39;) {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super({</span></span>
<span class="line"><span>      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),</span></span>
<span class="line"><span>      ignoreExpiration: false,</span></span>
<span class="line"><span>      secretOrKey: jwtConstants.secret,</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  async validate(payload: any) {</span></span>
<span class="line"><span>    //能到这里来说明一定是一个之前签过名的用户，不然不会进到该函数，直接返回401错误了</span></span>
<span class="line"><span>    return { userId: payload.sub, username: payload.username };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>创建好之后将JwtStrategy加入到auth-module的providers中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> providers: [</span></span>
<span class="line"><span>   ...,</span></span>
<span class="line"><span>    JwtStrategy,</span></span>
<span class="line"><span>  ],</span></span></code></pre></div><h3 id="_3-构建guard" tabindex="-1">3. 构建Guard <a class="header-anchor" href="#_3-构建guard" aria-label="Permalink to &quot;3. 构建Guard&quot;">​</a></h3><p>策略做好后就创建xxxGuard，需要继承自AuthGuard(这里的名字就是创建策略时的那个name)，可以作为@UseGuard()装饰器的参数，</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { ExecutionContext, Injectable } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { AuthGuard } from &#39;@nestjs/passport&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class JwtAuthGuard extends AuthGuard(&#39;customJwt&#39;) {}</span></span></code></pre></div><p>这样做以后，每当使用该JwtAuthGuard的时候，都会找到JwtStrategy进行先前验证，这个寻找的过程找的就是name这个属性</p><h3 id="_4-使用" tabindex="-1">4. 使用 <a class="header-anchor" href="#_4-使用" aria-label="Permalink to &quot;4. 使用&quot;">​</a></h3><p>以上工作完成后就可以开始使用了！</p><p>使用方式：@UseGuards(这里填创建好的Guard，如JwtAuthGuard)</p><ul><li>在Controller上使用，则该控制器下的所有方法都要经过jwt的token验证</li><li>在方法上使用，只有该方法需要经过jwt的token验证</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@UseGuards(JwtAuthGuard)</span></span>
<span class="line"><span>@Get(&#39;hello&#39;)</span></span>
<span class="line"><span>getHello(@Request() req) {</span></span>
<span class="line"><span>	return req.user;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="四、全局使用guard" tabindex="-1">四、全局使用Guard <a class="header-anchor" href="#四、全局使用guard" aria-label="Permalink to &quot;四、全局使用Guard&quot;">​</a></h2><p>类似jwt这种token认证，几乎每个请求都会携带，如果要给所有的请求都加上@UseGuards(JwtAuthGuard)未免有些过于繁琐，因此nestjs提供了一种全局使用的方法</p><h3 id="_1-注册全局guard" tabindex="-1">1. 注册全局guard <a class="header-anchor" href="#_1-注册全局guard" aria-label="Permalink to &quot;1. 注册全局guard&quot;">​</a></h3><p>可以在任意一个模块进行，不过我们就在auth模块进行了，方法如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { APP_GUARD } from &#39;@nestjs/core&#39;;</span></span>
<span class="line"><span>import { JwtAuthGuard } from &#39;./jwt-auth.guard&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [</span></span>
<span class="line"><span>  ...,</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      provide: APP_GUARD,</span></span>
<span class="line"><span>      useClass: JwtAuthGuard,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AuthModule {}</span></span></code></pre></div><h3 id="_2-自定义public装饰器" tabindex="-1">2. 自定义Public装饰器 <a class="header-anchor" href="#_2-自定义public装饰器" aria-label="Permalink to &quot;2. 自定义Public装饰器&quot;">​</a></h3><p>名字自选</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { SetMetadata } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const IS_PUBLIC_KEY = &#39;isPublic&#39;;</span></span>
<span class="line"><span>export const Public = () =&gt; SetMetadata(IS_PUBLIC_KEY, true);</span></span></code></pre></div><h3 id="_3-重写jwtauthguard" tabindex="-1">3. 重写JwtAuthGuard <a class="header-anchor" href="#_3-重写jwtauthguard" aria-label="Permalink to &quot;3. 重写JwtAuthGuard&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { ExecutionContext, Injectable } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { AuthGuard } from &#39;@nestjs/passport&#39;;</span></span>
<span class="line"><span>import { Reflector } from &#39;@nestjs/core&#39;;</span></span>
<span class="line"><span>import { Observable } from &#39;rxjs&#39;;</span></span>
<span class="line"><span>import { IS_PUBLIC_KEY } from &#39;./public-auth.decorator&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class JwtAuthGuard extends AuthGuard(&#39;customJwt&#39;) {</span></span>
<span class="line"><span>  constructor(private reflector: Reflector) {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  canActivate(</span></span>
<span class="line"><span>    context: ExecutionContext,</span></span>
<span class="line"><span>  ): boolean | Promise&lt;boolean&gt; | Observable&lt;boolean&gt; {</span></span>
<span class="line"><span>    // 用来过滤白名单，被@Public装饰器修饰的控制器直接跳过不做验证</span></span>
<span class="line"><span>    const isPublic = this.reflector.getAllAndOverride&lt;boolean&gt;(IS_PUBLIC_KEY, [</span></span>
<span class="line"><span>      context.getHandler(),</span></span>
<span class="line"><span>      context.getClass(),</span></span>
<span class="line"><span>    ]);</span></span>
<span class="line"><span>    if (isPublic) {</span></span>
<span class="line"><span>      return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return super.canActivate(context);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面的意思就是说，只要是被@Public()修饰的，都不做验证，其它的都还是经过super.canActivate(context)的验证</p><h3 id="_4-使用-1" tabindex="-1">4. 使用 <a class="header-anchor" href="#_4-使用-1" aria-label="Permalink to &quot;4. 使用&quot;">​</a></h3><p>直接在需要过滤的方法或者Controller上添加@Public()装饰器就可以了</p>`,68),l=[t];function i(r,o,c,u,d,h){return a(),n("div",null,l)}const b=s(e,[["render",i]]);export{g as __pageData,b as default};
