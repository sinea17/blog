import{_ as a,M as l,p as t,q as c,Q as r,R as e,t as n,N as s,a1 as d}from"./framework-5866ffd3.js";const o={},v=e("h1",{id:"hexo-手记",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#hexo-手记","aria-hidden":"true"},"#"),n(" Hexo 手记")],-1),u=e("p",null,[n("之前经过"),e("code",null,"Jekyll"),n("一系列踩坑部署了,想换个主题出各种问题,主要是最开始装环境出的错(改包路径到"),e("code",null,"/usr/local/bin"),n("),导致有时候"),e("code",null,"jekyll"),n("命令报错,就放弃了")],-1),m=d(`<p>以下都是基于<code>OS X</code>系统操作的</p><p>版本说明（时间为 2017-1-3）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hexo_blog git:(master) ✗ hexo -v
hexo: 3.2.2
hexo-cli: 1.0.2
os: Darwin 16.3.0 darwin x64
http_parser: 2.5.2
node: 4.4.4
v8: 4.5.103.35
uv: 1.8.0
zlib: 1.2.8
ares: 1.10.1-DEV
icu: 56.1
modules: 46
openssl: 1.0.2h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装-hexo" tabindex="-1"><a class="header-anchor" href="#安装-hexo" aria-hidden="true">#</a> 安装 Hexo</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install -g hexo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="本地创建博客" tabindex="-1"><a class="header-anchor" href="#本地创建博客" aria-hidden="true">#</a> 本地创建博客</h2><p>初始化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 在目标文件夹下进行
hexo init
npm install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开启本地博客预览</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 构建站点文件
hexo g  // 全拼是：hexo generate，可以简写成 hexo g

//启动本地服务器，默认地址为 localhost:4000
hexo s  // 全拼是：hexo server，可以简写成 hexo s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="发布到-coding-github" tabindex="-1"><a class="header-anchor" href="#发布到-coding-github" aria-hidden="true">#</a> 发布到 Coding（github）</h2><p>之前的<code>Jekyll</code>是通过<code>Git</code>一步步手动上传的，这里的<code>Hexo</code>已经拥有&#39;一键&#39;部署组件，其安装如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install hexo-deployer-git --save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后打开<code>_config.ym</code>文件进行编辑</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//[github] =&gt; git@github.com:yourusername/youusername.github.io.git
//[coding] =&gt; git@git.coding.net:yourusername/yourusername.coding.me.git
deploy:
  type: git
  repo: //填写参考注释，如：git@git.coding.net:sinea17/sinea17.coding.me.git
  branch: master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发布（这里只有<code>hexo d</code>，是因为前面已经执行了<code>hexo g</code>生产）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hexo d      // 发布命令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="更改博客主题" tabindex="-1"><a class="header-anchor" href="#更改博客主题" aria-hidden="true">#</a> 更改博客主题</h2><ol><li>克隆/下载（Ps:克隆慢，可能断掉，建议下载）</li><li>配置_config.yml，<code>theme</code>值改为主题名</li><li>验证主题<code>hexo s --debug</code>（debug 调试模式）</li></ol>`,19),b={href:"http://theme-next.iissnan.com/getting-started.html",target:"_blank",rel:"noopener noreferrer"},p=e("h2",{id:"日常命令",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#日常命令","aria-hidden":"true"},"#"),n(" 日常命令：")],-1),g=d(`<li><p>创建普通文章</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hexo new &quot;文章标题&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>给文章添加标签和分类</p><p>在文章（后缀<code>.md</code>）文件中加入 tag 和 categor 即可指定标签和分类。例子如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---
title: blog title
date: 2016-07-20 10:59:31
tag: 我是标签
category: 我是分类
description: #本页描述 可省略
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面是单个标签或者分类,如果需要多个标签或分类可以两种写法(通用)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---
title: blog title
date: 2016-07-20 10:59:31
tag: [ 我是标签一, 我是标签二 ]
category:
    - 我是分类一
    - 我是分类二
description: #本页描述 可省略
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>创建照片文章</p><ol><li>修改<code>\\scaffolds\\photo.md</code>文件</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>layout: { { layout } }
title: { { title } }
date: { { date } }
tags:
photos:
- &lt;photo url&gt;
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>新建照片文章</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hexo new photo &quot;photoPostName&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>hexo 默认会处理全部 markdown 和 html 文件，如果不想让 hexo 解析，可以在文件头中加入 layout: false。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---
layout: photo
title: TestPhoto212
photos:
  - http://bruce.u.qiniudn.com/2013/11/27/reading/photos-1.jpg
date: 2017-01-04 13:44:34
tags:
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>文章摘要</p><p>用于显示在首页的文章短描述</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//文章中插入以下代码即可，其上文字为摘要，在首页中就会出现“阅读更多”，点击则显示全文。
&lt;!--more--&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>删除文章</p><ol><li>删除<code>/source/_posts</code>目录下的文章文件</li><li>重新生成站点静态网页，即：<code>hexo g</code></li></ol></li><li><p>创建页面 页面文件在博客根目录/source 下对应名称文件夹下的<code>index.md</code>文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//添加标签页
hexo new page tags

//添加分类页
hexo new page categories

//添加关于页
hexo new page about

//编辑关于页
  ---
  title: 关于
  date: 2017-01-04 11:31:06
  type: &quot;about&quot;
  comments: false
  ---
  姓名: 章凯
  所在地: 成都
  职业: WEB前端开发
  邮箱: sinea17@qq.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>代码高亮 需要在代码块第一个&#39;点点点&#39;后添加代码语言,但是测试后命令行 bash 没有效果,暂时不知道原因.写法如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  \`\`\`css
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>效果如下:</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.a:visited</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>正常发布</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hexo clean  // clean本地项目，防止缓存
hexo g      // 生成静态网页
hexo d      // 发布
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,8),h={href:"http://note.youdao.com/https://hexo.io/zh-cn/docs/commands.html",target:"_blank",rel:"noopener noreferrer"};function x(_,f){const i=l("ExternalLinkIcon");return t(),c("div",null,[v,u,r("more"),m,e("p",null,[n("附:"),e("a",b,[n("NexT 主题配置说明"),s(i)])]),p,e("ul",null,[g,e("li",null,[e("p",null,[n("Hexo 指令："),e("a",h,[n("点这里"),s(i)])])])])])}const k=a(o,[["render",x],["__file","Hexo手记.html.vue"]]);export{k as default};
