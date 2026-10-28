/**
 * ============================================================
 * 茶染教程内容（写死在本地，不查数据库）
 * 需要修改教程时，直接改下面的数组即可。
 * images[0..4] 与 utils/assets.js 中的 TUTORIAL_IMAGES 一一对应。
 * ============================================================
 */
const { TUTORIAL_IMAGES, PLACEHOLDER_VIDEO } = require('./assets.js')

/** 教程主视频 */
const MAIN_VIDEO = {
  src: PLACEHOLDER_VIDEO,
  poster: TUTORIAL_IMAGES[1],
  title: '青城茶染 · 完整制作流程'
}

/** 5 个标准步骤 */
const STEPS = [
  {
    index: 1,
    title: '准备材料',
    desc: '备齐染料、布料与工具，是染出均匀颜色的第一步。',
    points: [
      '染料：绿茶 / 红茶 / 乌龙茶的茶渣，或银杏叶、楠木叶等落叶',
      '布料：纯棉方巾、棉麻书签（天然纤维更容易上色）',
      '媒染剂：明矾、铁锈水（可选，但能显著提升牢度）',
      '工具：不锈钢锅、清水、温度计、夹子、手套'
    ],
    image: TUTORIAL_IMAGES[0],
    video: ''
  },
  {
    index: 2,
    title: '煮染',
    desc: '把染料放入锅中加水煮沸，滤出染液后放入布料浸煮。',
    points: [
      '水温：80–95℃（绿茶 80℃，红茶 90℃，落叶类 90–95℃）',
      '时间：30–60 分钟，浸染越久颜色越深',
      '用量：茶渣 60–100g 配 1–1.5L 清水'
    ],
    image: TUTORIAL_IMAGES[1],
    video: PLACEHOLDER_VIDEO
  },
  {
    index: 3,
    title: '媒染',
    desc: '媒染剂能让颜色更牢固，也能调出更丰富的色调。',
    points: [
      '明矾：最常用，约 5g/L，染出的颜色明亮清透',
      '铁锈水：含铁媒染，颜色加深、偏灰褐，古朴质感',
      '顺序：先染后媒或先媒后染都可以，本课推荐先染后媒'
    ],
    image: TUTORIAL_IMAGES[2],
    video: ''
  },
  {
    index: 4,
    title: '固色',
    desc: '染好的布料需要固色，才能经得起日常洗涤。',
    points: [
      '明矾固色：染后在 3% 明矾水中浸泡约 10 分钟',
      '清水漂洗：用凉水轻柔漂洗，直到水色清澈为止',
      '切忌：不要用洗衣粉、肥皂搓洗刚染好的布料'
    ],
    image: TUTORIAL_IMAGES[3],
    video: ''
  },
  {
    index: 5,
    title: '晾干与完成',
    desc: '阴干避光，颜色更稳定，一方青城色就完成了。',
    points: [
      '阴干：放在通风处自然阴干，避免阳光直晒以防褪色',
      '熨烫：半干时低温熨平，成品更挺括',
      '完成：拍照记录，把你的作品存进「我的作品」'
    ],
    image: TUTORIAL_IMAGES[4],
    video: ''
  }
]

module.exports = {
  MAIN_VIDEO,
  STEPS
}
