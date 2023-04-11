import{_ as t,M as p,p as o,q as c,Q as l,R as n,t as s,N as e,a1 as i}from"./framework-5866ffd3.js";const d={},r=n("h1",{id:"纯-css-横向菜单",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#纯-css-横向菜单","aria-hidden":"true"},"#"),s(" 纯 CSS 横向菜单")],-1),u=n("blockquote",null,[n("p",null,"纯 CSS 实现的横向菜单，宽度固定，高度模拟撑开父级效果，兼容 IE8")],-1),v={href:"http://runjs.cn/detail/nzblzwwx",target:"_blank",rel:"noopener noreferrer"},k=n("code",null,"+",-1),m={href:"http://www.w3school.com.cn/cssref/selector_element_plus.asp",target:"_blank",rel:"noopener noreferrer"},b=i(`<div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">//&#39;全部商品&#39;:hover
.all-product:hover + .nav</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code>position: absolute;</code>绝对定位使二级菜单与一级菜单顶部对齐，二级菜单添加<code>padding-left</code>为一级菜单留下显示空间</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">// 二级菜单
.nav ul ul</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> -5px<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 440px<span class="token punctuation">;</span>
  <span class="token property">padding-left</span><span class="token punctuation">:</span> 90px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 5px solid #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时为它们添加层级（一级菜单<code>position</code>定位），一级菜单选项<code>z-index:2</code>，二级菜单<code>z-index:1</code></p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">//一级菜单-选项a
.nav &gt; ul &gt; li &gt; a</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function _(h,f){const a=p("ExternalLinkIcon");return o(),c("div",null,[r,u,l("more"),n("p",null,[n("a",v,[s("在线演示"),e(a)])]),n("p",null,[s("通过"),k,n("a",m,[s("选择器"),e(a)]),s("控制显示一级菜单")]),b])}const x=t(d,[["render",_],["__file","纯CSS横向菜单.html.vue"]]);export{x as default};
