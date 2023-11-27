import{_ as e,o as a,c as o,R as t}from"./chunks/framework.KB1hzIC4.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/frontend/css/移动端适配/2.视口.md","filePath":"articles/frontend/css/移动端适配/2.视口.md","lastUpdated":1701094652000}'),i={name:"articles/frontend/css/移动端适配/2.视口.md"},c=t('<blockquote><p>什么是视口呢？<code>viewport</code></p></blockquote><ul><li><p>在浏览器中我们可以看的区域就是视口，我们说的fixed就是相对于视口进行定位的，在<code>PC</code>端的页面中，我们是不需要对视口进行区分的，因为我们的布局视口和视觉视口是同一个。</p></li><li><p>但是移动端不太一样，我们的布局的视口和可见的视口不太一样</p><ul><li>移动端的网页窗口往往比较小，我们坑会希望一个大的网页在移动端可以完整的显示</li><li>移动端的布局视口是大于视觉视口的</li></ul></li></ul><p>所以在移动端，我们可以将视口划分为3种情况</p><ul><li>布局视口<code>layout viewport</code></li><li>视觉视口<code>visual layout</code></li><li>理想视口<code>ideal layout</code></li></ul><h2 id="一、布局视口" tabindex="-1">一、布局视口 <a class="header-anchor" href="#一、布局视口" aria-label="Permalink to &quot;一、布局视口&quot;">​</a></h2><p>默认情况下，一个在PC端的网页在移动端是如何显示的呢？</p><p>它会按照宽度为<code>980px</code>来布局一个页面的盒子和内容，为了手机端可以完整的显示在页面中，会对整个页面进行缩小，我们相对于<code>980px</code>布局的这个视口，称之为布局视口<code>layout viewport</code>，布局视口默认宽度是<code>980px</code></p><h2 id="二、视觉视口" tabindex="-1">二、视觉视口 <a class="header-anchor" href="#二、视觉视口" aria-label="Permalink to &quot;二、视觉视口&quot;">​</a></h2><p>如果默认情况下，我们按照<code>980px</code>显示内容，那么右侧有一部分区域就无法显示，所以手机端浏览器会默认对页面进行缩放以显示到用户的可见区域中，那么在可见区域这个视口，就是视觉视口<code>visual viewport</code></p><img src="https://gitlab.com/lijing-2008/blogpic/-/raw/main/pictures/2022/12/28_15_16_34_image-20221228151634725.png" alt="image-20221228151634725" style="zoom:50%;"><h2 id="三、理想视口" tabindex="-1">三、理想视口 <a class="header-anchor" href="#三、理想视口" aria-label="Permalink to &quot;三、理想视口&quot;">​</a></h2><p>将布局视口和视觉视口设置为相等的时候，就是理想视口了</p><p><img src="https://gitlab.com/lijing-2008/blogpic/-/raw/main/pictures/2022/12/28_15_30_47_image-20221228153047842.png" alt="image-20221228153047842"></p>',13),l=[c];function d(r,p,s,n,_,u){return a(),o("div",null,l)}const f=e(i,[["render",d]]);export{m as __pageData,f as default};
