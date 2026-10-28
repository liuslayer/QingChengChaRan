这个目录用于放置你自己的真实素材（图片 / 视频）。

替换步骤：
1. 把图片按下面命名放进本目录：
     banner.jpg      首页横幅
     step1.jpg ~ step5.jpg   教程 5 个步骤配图
2. 打开 utils/assets.js，把对应的在线占位地址改成 '/images/xxx.jpg'。
   （文件里已经在每一处写好了「换成真实素材时改为」的注释，照着改即可）
3. 视频放到云存储或图床，把 utils/assets.js 里的 PLACEHOLDER_VIDEO 换成真实地址；
   也可以直接在 utils/tutorialData.js 里改成微信视频号链接。

页面代码不需要做任何改动。
