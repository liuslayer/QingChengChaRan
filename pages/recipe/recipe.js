const { INGREDIENTS, FABRICS, getRecipe } = require('../../utils/recipeData.js')
const { toast } = require('../../utils/util.js')

Page({
  data: {
    ingredients: INGREDIENTS,
    fabrics: FABRICS,
    ingredientIndex: 0,
    fabricIndex: 0,
    searched: false,
    result: null,
    resultRows: []
  },

  onIngredientChange(e) {
    this.setData({
      ingredientIndex: Number(e.detail.value),
      searched: false,
      result: null,
      resultRows: []
    })
  },

  onFabricChange(e) {
    this.setData({
      fabricIndex: Number(e.detail.value),
      searched: false,
      result: null,
      resultRows: []
    })
  },

  /** 查配方 */
  onSearch() {
    const ingredient = this.data.ingredients[this.data.ingredientIndex]
    const fabric = this.data.fabrics[this.data.fabricIndex]
    const result = getRecipe(ingredient, fabric)

    if (!result) {
      toast('暂时没有这组配方，换一个组合试试')
      return
    }

    const resultRows = [
      { label: '染料用量', value: result.dosage },
      { label: '水比', value: result.waterRatio },
      { label: '媒染剂', value: result.mordant },
      { label: '浸染温度', value: result.temperature },
      { label: '浸染时间', value: result.time }
    ]

    this.setData({ result: result, resultRows: resultRows, searched: true })
  },

  onReset() {
    this.setData({
      ingredientIndex: 0,
      fabricIndex: 0,
      searched: false,
      result: null,
      resultRows: []
    })
  },

  onShareAppMessage() {
    return {
      title: '青城茶染配方参考 · 查一份属于你的染料配方',
      path: '/pages/recipe/recipe'
    }
  }
})
