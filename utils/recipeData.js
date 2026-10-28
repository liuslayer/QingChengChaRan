/**
 * ============================================================
 * 配方数据（写死在本地，不查数据库）
 * 共 18 条 = 6 种原料 × 3 种布料，任意组合都有结果
 *
 * 需要调整配方时，直接改下面的数组即可，页面会自动更新。
 * ============================================================
 */

/** 可选原料 */
const INGREDIENTS = ['绿茶', '红茶', '乌龙茶', '银杏叶', '楠木叶', '其他落叶']

/** 可选布料 */
const FABRICS = ['棉方巾', '棉麻书签', '其他']

/** 配方表 */
const RECIPES = [
  /* ---------------- 绿茶 ---------------- */
  {
    ingredient: '绿茶',
    fabric: '棉方巾',
    dosage: '茶渣 60g',
    waterRatio: '1 : 15',
    mordant: '明矾 5g/L',
    temperature: '80℃',
    time: '30 分钟',
    tip: '绿茶汤色偏浅，染出的黄绿最清透；想要更绿可延长浸染至 60 分钟。'
  },
  {
    ingredient: '绿茶',
    fabric: '棉麻书签',
    dosage: '茶渣 40g',
    waterRatio: '1 : 15',
    mordant: '明矾 5g/L',
    temperature: '80℃',
    time: '20 分钟',
    tip: '书签布料小而薄，上色快，时间可适当缩短，避免颜色过深。'
  },
  {
    ingredient: '绿茶',
    fabric: '其他',
    dosage: '茶渣 75g',
    waterRatio: '1 : 12',
    mordant: '明矾 5g/L',
    temperature: '85℃',
    time: '45 分钟',
    tip: '厚度未知的布料建议先用小样试色，再决定最终浸染时间。'
  },

  /* ---------------- 红茶 ---------------- */
  {
    ingredient: '红茶',
    fabric: '棉方巾',
    dosage: '茶渣 80g',
    waterRatio: '1 : 12',
    mordant: '明矾 5g/L',
    temperature: '90℃',
    time: '40 分钟',
    tip: '煮出浓茶汤后先滤掉茶渣再下布，成品更均匀、不易附着碎屑。'
  },
  {
    ingredient: '红茶',
    fabric: '棉麻书签',
    dosage: '茶渣 50g',
    waterRatio: '1 : 12',
    mordant: '明矾 5g/L',
    temperature: '90℃',
    time: '30 分钟',
    tip: '小件布料用夹子夹住边角浸染，避免烫手，也方便随时观察颜色。'
  },
  {
    ingredient: '红茶',
    fabric: '其他',
    dosage: '茶渣 100g',
    waterRatio: '1 : 10',
    mordant: '明矾 5g/L',
    temperature: '90℃',
    time: '55 分钟',
    tip: '红茶单宁丰富，染液浓度高时颜色偏红棕，可适当加水稀释。'
  },

  /* ---------------- 乌龙茶 ---------------- */
  {
    ingredient: '乌龙茶',
    fabric: '棉方巾',
    dosage: '茶渣 70g',
    waterRatio: '1 : 15',
    mordant: '明矾 4g/L',
    temperature: '85℃',
    time: '35 分钟',
    tip: '半发酵茶色调介于绿茶与红茶之间，先染后媒可让蜜黄色更透亮。'
  },
  {
    ingredient: '乌龙茶',
    fabric: '棉麻书签',
    dosage: '茶渣 45g',
    waterRatio: '1 : 15',
    mordant: '明矾 4g/L',
    temperature: '85℃',
    time: '25 分钟',
    tip: '书签面积小，同一锅染液可一次染 3–5 件，注意留出翻动空间。'
  },
  {
    ingredient: '乌龙茶',
    fabric: '其他',
    dosage: '茶渣 85g',
    waterRatio: '1 : 12',
    mordant: '明矾 4g/L',
    temperature: '88℃',
    time: '50 分钟',
    tip: '乌龙茶上色较慢，延长浸染时间比增加茶渣用量更划算。'
  },

  /* ---------------- 银杏叶 ---------------- */
  {
    ingredient: '银杏叶',
    fabric: '棉方巾',
    dosage: '落叶 100g',
    waterRatio: '1 : 12',
    mordant: '铁锈水 20ml/L',
    temperature: '90℃',
    time: '45 分钟',
    tip: '秋季落叶单宁含量最高，铁媒染后会转为深黄乃至橄榄绿。'
  },
  {
    ingredient: '银杏叶',
    fabric: '棉麻书签',
    dosage: '落叶 60g',
    waterRatio: '1 : 12',
    mordant: '铁锈水 20ml/L',
    temperature: '90℃',
    time: '35 分钟',
    tip: '使用铁锈水后要彻底漂洗，否则残留铁质会让布料慢慢变暗。'
  },
  {
    ingredient: '银杏叶',
    fabric: '其他',
    dosage: '落叶 120g',
    waterRatio: '1 : 10',
    mordant: '铁锈水 25ml/L',
    temperature: '95℃',
    time: '60 分钟',
    tip: '落叶提前浸泡一夜再煮，出汁更充分，颜色更饱和。'
  },

  /* ---------------- 楠木叶 ---------------- */
  {
    ingredient: '楠木叶',
    fabric: '棉方巾',
    dosage: '落叶 120g',
    waterRatio: '1 : 10',
    mordant: '铁锈水 30ml/L',
    temperature: '95℃',
    time: '60 分钟',
    tip: '楠木叶单宁极高，铁媒染后呈深褐灰，接近墨色，适合做底布。'
  },
  {
    ingredient: '楠木叶',
    fabric: '棉麻书签',
    dosage: '落叶 75g',
    waterRatio: '1 : 10',
    mordant: '铁锈水 30ml/L',
    temperature: '95℃',
    time: '45 分钟',
    tip: '颜色较深，建议留少量白边或做留白扎染，成品层次更清楚。'
  },
  {
    ingredient: '楠木叶',
    fabric: '其他',
    dosage: '落叶 150g',
    waterRatio: '1 : 8',
    mordant: '铁锈水 35ml/L',
    temperature: '100℃',
    time: '75 分钟',
    tip: '楠木叶染液气味较重，请在通风处操作，并佩戴手套。'
  },

  /* ---------------- 其他落叶 ---------------- */
  {
    ingredient: '其他落叶',
    fabric: '棉方巾',
    dosage: '落叶 100g',
    waterRatio: '1 : 12',
    mordant: '明矾 5g/L',
    temperature: '90℃',
    time: '40 分钟',
    tip: '混合落叶颜色不可控，建议先染一块小样试色再正式制作。'
  },
  {
    ingredient: '其他落叶',
    fabric: '棉麻书签',
    dosage: '落叶 60g',
    waterRatio: '1 : 12',
    mordant: '明矾 5g/L',
    temperature: '90℃',
    time: '30 分钟',
    tip: '身份不明的落叶不要使用，避免有毒植物影响健康。'
  },
  {
    ingredient: '其他落叶',
    fabric: '其他',
    dosage: '落叶 120g',
    waterRatio: '1 : 10',
    mordant: '明矾 5g/L',
    temperature: '95℃',
    time: '55 分钟',
    tip: '厚布料吸水多，染液量要留足，保证布料能完全浸没。'
  }
]

/**
 * 按「原料 + 布料」查出对应配方
 * @returns {Object|null}
 */
function getRecipe(ingredient, fabric) {
  return (
    RECIPES.find(function (r) {
      return r.ingredient === ingredient && r.fabric === fabric
    }) || null
  )
}

module.exports = {
  INGREDIENTS,
  FABRICS,
  RECIPES,
  getRecipe
}
