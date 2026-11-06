本目录存放会被打包进小程序的图片素材。

当前已导入：
  home-banner.jpg   首页横幅
  process1.jpg      教程步骤 1「准备材料」配图

要新增 / 替换图片：
  1. 把图片放进本目录（建议压缩到 300KB 以内、宽度 750px 左右）
  2. 打开 utils/assets.js，把路径改成 '/images/文件名.jpg'

视频不能放这里（单个代码包上限 2MB），必须上传到云开发存储，
然后把文件 ID 填进 utils/assets.js 的 TUTORIAL_MAIN_VIDEO / TUTORIAL_STEP_VIDEOS。
具体步骤见 docs/部署与注册指南.md 的「上传教程视频」一节。

页面代码不需要改动。
