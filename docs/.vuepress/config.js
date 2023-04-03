import { defineUserConfig, defaultTheme } from "vuepress";

export default defineUserConfig({
  base: "/note/",
  lang: "zh-CN",
  title: "SINEA前端工坊",
  description: "前端开发学习备忘",
  theme: defaultTheme({
    logo: "/images/favicon.ico",
    navbar: [
      {
        text: "博客",
        link: "/blog/",
      },
    ],
    sidebar: [
      {
        text: "2020",
        children: [
          "/blog/2020/UniApp H5 浏览器下载图片 兼容iOS、Android",
          "/blog/2020/VUE中实现输入框Input输入格式限制",
        ],
      },
      {
        text: "2018",
        children: [
          "/blog/2018/PDA终端扫描实现",
          "/blog/2018/APP打包上架相关",
          "/blog/2018/使用Express、MongoDB搭建多人博客",
          "/blog/2018/Git操作笔记",
          "/blog/2018/微信小程序swiper内容高度适配",
          "/blog/2018/React学习之道",
          "/blog/2018/Redux笔记",
          "/blog/2018/React笔记",
          "/blog/2018/JavaScript开发注意事项",
          "/blog/2018/MongoDB笔记",
        ],
      },
      {
        text: "2017",
        children: [
          "/blog/2017/移动端开发注意事项",
          "/blog/2017/Mac下使用Homebrew安装MongoDB",
          "/blog/2017/WebStorm-Less编译、压缩、源映射",
          "/blog/2017/纯CSS横向菜单",
          "/blog/2017/Hexo手记",
        ],
      },
      {
        text: "2016",
        children: ["/blog/2016/Jekyll踩坑记"],
      },
    ],
  }),
});
