/**
 * ============================================================
 * 素材配置 —— 所有图片 / 视频地址集中在这里
 *
 * 图片：放在 /images 目录，直接用本地路径（不受域名校验限制，也不占多少包体）
 * 视频：文件体积大，必须托管在代码包之外（云存储），见下方说明
 * ============================================================
 */

/* ------------------ 首页 ------------------ */

/** 首页横幅图（真实素材，287KB） */
const HOME_BANNER = '/images/home-banner.jpg'

/**
 * 首页横幅视频（替代横幅图）
 *
 * 留空 '' 时首页显示 HOME_BANNER 图片；填入远程地址后自动切换为视频。
 * ⚠️ 视频必须托管在代码包之外（云存储 / CDN）：
 *    小程序单个代码包上限 2MB，视频文件打进包会导致真机预览和上传失败。
 */
const HOME_BANNER_VIDEO = ''

/* ------------------ 青城四色 ------------------ */
const FOUR_COLORS = [
  {
    name: '春芽绿',
    hex: '#7C9A6D',
    season: '春',
    desc: '取自绿茶与春叶，清透鲜嫩，像青城山初春刚冒出来的新芽。'
  },
  {
    name: '夏烟青',
    hex: '#6E8B96',
    season: '夏',
    desc: '铁媒染后的淡青灰，如雨后山间浮起的一层薄雾。'
  },
  {
    name: '秋落赭',
    hex: '#B5714A',
    season: '秋',
    desc: '银杏与落叶染出的赭黄，是山中最明亮的那一抹秋色。'
  },
  {
    name: '冬岩褐',
    hex: '#6B5B4A',
    season: '冬',
    desc: '楠木叶与老茶渣沉淀出的深褐，沉稳如冬日山岩。'
  }
]

/* ------------------ 茶染教程 ------------------ */

/** 教程步骤 1「准备材料」的配图（219KB） */
const TUTORIAL_STEP_IMAGE = '/images/process1.jpg'

/**
 * 教程视频 —— 填云存储文件 ID（以 cloud:// 开头）
 *
 * 获取方式：
 *   1. 开发者工具 → 顶部「云开发」→ 云开发控制台 → 存储
 *   2. 上传对应视频文件（建议放到 videos/ 目录下，保持文件名不变）
 *   3. 点开文件 → 复制「文件 ID」，粘贴到下面
 *
 * 页面会自动把 cloud:// 换成可播放的临时地址，无需手动处理。
 * 留空 '' 时该位置显示「视频待上传」占位块，不影响其他内容。
 */
const TUTORIAL_MAIN_VIDEO = 'cloud://cloud1-d3g97dztq08f39333.636c-cloud1-d3g97dztq08f39333-1517762258/complete-process.mp4'   // 完整流程 → complete-process.mp4
const TUTORIAL_STEP_VIDEOS = [   // 依次对应步骤 2、3、4
  'cloud://cloud1-d3g97dztq08f39333.636c-cloud1-d3g97dztq08f39333-1517762258/process2.mp4',                            // process2.mp4（熬茶汤）
  'cloud://cloud1-d3g97dztq08f39333.636c-cloud1-d3g97dztq08f39333-1517762258/process3.mp4',                            // process3.mp4（扎制）
  'cloud://cloud1-d3g97dztq08f39333.636c-cloud1-d3g97dztq08f39333-1517762258/process4.mp4'                             // process4.mp4（染布）
]

module.exports = {
  HOME_BANNER,
  HOME_BANNER_VIDEO,
  FOUR_COLORS,
  TUTORIAL_STEP_IMAGE,
  TUTORIAL_MAIN_VIDEO,
  TUTORIAL_STEP_VIDEOS
}
