/**
 * ============================================================
 * 素材配置 —— 所有图片 / 视频地址集中在这里
 *
 * 目前全部使用「在线占位素材」，方便你先看到完整效果。
 * 后期替换成真实素材时：
 *   方式 A（最省事）：把真实图片放到 /images 目录，
 *                    然后改用下面注释掉的 LOCAL_xxx 常量。
 *   方式 B：把在线地址直接换成你的图床 / CDN 地址。
 *   两种方式都只需改本文件，页面代码一行都不用动。
 * ============================================================
 */

/** 在线图片生成接口（占位素材专用） */
function img(prompt, size) {
  return (
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' +
    encodeURIComponent(prompt) +
    '&image_size=' +
    size
  )
}

/* ------------------ 首页 ------------------ */

/** 首页横幅：青城山 / 茶染方巾 */
const HOME_BANNER = img(
  'misty Qingcheng mountain bamboo forest at dawn, natural plant dyed cotton fabric hanging on bamboo pole, soft green and ochre tones, serene chinese ink wash painting atmosphere',
  'landscape_16_9'
)
// 换成真实素材时改为：const HOME_BANNER = '/images/banner.jpg'

/**
 * 首页横幅视频（替代上面的横幅图）
 *
 * 留空 '' 时首页显示 HOME_BANNER 图片；填入地址后自动切换为视频。
 * 视频同时作为视频未加载出来时的封面图（poster）。
 *
 * ⚠️ 视频必须托管在代码包之外（云存储 / CDN），不要放本地 videos 目录：
 *    小程序单个代码包上限 2MB，15MB 的原片会导致真机预览和上传失败。
 *    videos/ 已在 project.config.json 的 packOptions.ignore 中排除，不会被打包。
 *
 * 填法示例：
 *   - 云存储临时地址：'https://xxx.tcb.qcloud.la/home-banner.mp4'
 *   - 自有 CDN：      'https://cdn.example.com/home-banner.mp4'
 *   - 本地压缩小视频：'/videos/home-banner.mp4'（仅限 < 2MB，且需从 packOptions.ignore 移除 videos）
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

/** 教程 5 个步骤的配图，顺序与 utils/tutorialData.js 中的步骤一一对应 */
const TUTORIAL_IMAGES = [
  img(
    'flat lay of dried tea leaves, fallen ginkgo leaves, folded cotton cloth, stainless steel pot and water bowl on linen background, warm natural light, still life photography',
    'landscape_4_3'
  ),
  img(
    'close up of boiling tea dye liquid in a stainless steel pot with white cotton fabric being dipped in, steam rising, warm brown tea tones',
    'landscape_4_3'
  ),
  img(
    'hands dipping white cotton fabric into alum mordant solution in a glass bowl, natural craft workshop setting, soft daylight',
    'landscape_4_3'
  ),
  img(
    'rinsing freshly dyed ochre cotton fabric in a clear water basin outdoors, water droplets, natural light',
    'landscape_4_3'
  ),
  img(
    'freshly dyed natural tea colored cotton scarves hanging on a bamboo pole to dry, soft daylight, craft workshop',
    'landscape_4_3'
  )
]
// 换成真实素材时改为：
// const TUTORIAL_IMAGES = [
//   '/images/step1.jpg', '/images/step2.jpg', '/images/step3.jpg',
//   '/images/step4.jpg', '/images/step5.jpg'
// ]

/** 教程视频（占位）。替换成你的茶染教学视频地址或微信视频号视频链接 */
const PLACEHOLDER_VIDEO = 'https://media.w3.org/2010/05/sintel/trailer.mp4'

/** 作品列表 / 详情图加载失败时的兜底图（纯色，无需网络） */
const PLACEHOLDER_BLANK = ''

module.exports = {
  HOME_BANNER,
  HOME_BANNER_VIDEO,
  FOUR_COLORS,
  TUTORIAL_IMAGES,
  PLACEHOLDER_VIDEO,
  PLACEHOLDER_BLANK
}
