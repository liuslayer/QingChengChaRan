/**
 * ============================================================
 * 数据访问层 —— 作品数据 + 图片上传
 *
 * 同一套方法，内部自动适配两种模式：
 *   · 云开发模式：作品写云数据库、图片传云存储（填了 CLOUD_ENV 时）
 *   · 本地模式　：作品写手机本地缓存（未填 CLOUD_ENV 时）
 * 两种模式的方法签名完全一致，页面代码无需关心底层差异。
 *
 * 所有方法都返回 Promise。
 * ============================================================
 */
const { COLLECTION_WORKS, useCloud } = require('./config.js')
const { formatDate, randomString } = require('./util.js')

/** 本地模式下的缓存键 */
const LOCAL_KEY = 'qc_works'

/** 云数据库集合，客户端单次最多取 20 条，这里做分批拉取 */
const PAGE_SIZE = 20

function coll() {
  return wx.cloud.database().collection(COLLECTION_WORKS)
}

/** 从缓存读本地作品列表 */
function readLocal() {
  return wx.getStorageSync(LOCAL_KEY) || []
}

/** 写本地作品列表 */
function writeLocal(list) {
  wx.setStorageSync(LOCAL_KEY, list)
  return list
}

/* ============================================================
 * 查询
 * ============================================================ */

/**
 * 拉取当前用户的全部作品，按创建时间倒序
 * @returns {Promise<Array>}
 */
function listWorks() {
  if (!useCloud) {
    return Promise.resolve(readLocal())
  }

  return new Promise(function (resolve, reject) {
    const all = []
    function fetch(skip) {
      coll()
        .orderBy('createTime', 'desc')
        .skip(skip)
        .limit(PAGE_SIZE)
        .get()
        .then(function (res) {
          const data = res.data || []
          all.push.apply(all, data)
          if (data.length === PAGE_SIZE) {
            fetch(skip + PAGE_SIZE)
          } else {
            resolve(all)
          }
        })
        .catch(reject)
    }
    fetch(0)
  })
}

/**
 * 取单条作品
 * @param {string} id 作品 _id
 * @returns {Promise<Object|null>}
 */
function getWork(id) {
  if (!id) return Promise.resolve(null)

  if (!useCloud) {
    const found = readLocal().find(function (w) {
      return w._id === id
    })
    return Promise.resolve(found || null)
  }

  return coll()
    .doc(id)
    .get()
    .then(function (res) {
      return res.data || null
    })
}

/* ============================================================
 * 增删改
 * ============================================================ */

/**
 * 新增作品
 * @param {Object} data 见下方字段说明
 * @returns {Promise<string>} 新增记录的 _id
 */
function addWork(data) {
  const record = {
    name: data.name || '',
    imageFileID: data.imageFileID || '',
    ingredient: data.ingredient || '',
    recipe: data.recipe || '',
    date: data.date || '',
    note: data.note || '',
    createTime: Date.now()
  }

  if (!useCloud) {
    record._id = 'local_' + Date.now() + '_' + randomString(4)
    const list = readLocal()
    list.unshift(record)
    writeLocal(list)
    return Promise.resolve(record._id)
  }

  return coll()
    .add({ data: record })
    .then(function (res) {
      return res._id
    })
}

/**
 * 更新作品（不改 createTime）
 * @returns {Promise<void>}
 */
function updateWork(id, data) {
  if (!useCloud) {
    const list = readLocal().map(function (w) {
      if (w._id !== id) return w
      return Object.assign({}, w, data)
    })
    writeLocal(list)
    return Promise.resolve()
  }

  return coll()
    .doc(id)
    .update({ data: data })
    .then(function () {})
}

/**
 * 删除作品（云模式下同时删除云存储里的图片）
 * @returns {Promise<void>}
 */
function removeWork(id) {
  if (!useCloud) {
    const list = readLocal().filter(function (w) {
      return w._id !== id
    })
    writeLocal(list)
    return Promise.resolve()
  }

  return getWork(id).then(function (work) {
    const fileID = work && work.imageFileID
    return coll()
      .doc(id)
      .remove()
      .then(function () {
        if (fileID && fileID.indexOf('cloud://') === 0) {
          // 图片删除失败不影响作品删除，静默处理
          wx.cloud.deleteFile({ fileList: [fileID] }).catch(function () {})
        }
      })
  })
}

/* ============================================================
 * 图片上传
 * ============================================================ */

/**
 * 上传作品图片
 * @param {string} localPath wx.chooseMedia 拿到的临时文件路径
 * @returns {Promise<string>} 云模式返回 fileID；本地模式直接返回原路径
 */
function uploadImage(localPath) {
  if (!useCloud) {
    return Promise.resolve(localPath)
  }

  const cloudPath =
    'works/' + formatDate(new Date()) + '_' + randomString(8) + '.jpg'

  return wx.cloud
    .uploadFile({ cloudPath: cloudPath, filePath: localPath })
    .then(function (res) {
      return res.fileID
    })
}

/**
 * 把云存储 fileID 换成可直接给 <image> / 分享卡片使用的临时链接
 * 本地路径或普通 http 地址原样返回
 * @returns {Promise<string>}
 */
function getDisplayUrl(fileID) {
  if (!fileID || fileID.indexOf('cloud://') !== 0 || !useCloud) {
    return Promise.resolve(fileID || '')
  }
  return wx.cloud
    .getTempFileURL({ fileList: [fileID] })
    .then(function (res) {
      const item = res.fileList && res.fileList[0]
      return (item && item.tempFileURL) || fileID
    })
    .catch(function () {
      return fileID
    })
}

/** 当前是否云开发模式（页面可用来显示提示文案） */
function isCloudMode() {
  return useCloud
}

module.exports = {
  listWorks,
  getWork,
  addWork,
  updateWork,
  removeWork,
  uploadImage,
  getDisplayUrl,
  isCloudMode
}
