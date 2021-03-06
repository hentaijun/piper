import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'

axios.defaults.baseURL = '/api';

// loading bar
const loadTimer = []
const showLoading = (bool) => {
  if (bool) {
    loadTimer.push(setTimeout(() => {
      store.commit('CHANGE_LOADING_BAR', true)
    }, 100))
  } else {
    clearTimeout(loadTimer.splice(0, 1))
    store.commit('CHANGE_LOADING_BAR', false)
  }
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  showLoading(true)
  return config
}, function (error) {
  showLoading(false)
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  showLoading(false)
  // TODO 全局api错误处理
  return response
}, function (error) {
  showLoading(false)
  // TODO 网络异常处理
  return Promise.reject(error)
})

export default {
  page: {
    getData(id) {
      return axios
        .get('page/'+id)
    },
    updateData(id, data) {
      return axios
        .put('page/'+id, data)
    },
    /**
     * 保存 design
     * @returns {*}
     */
    saveData(data) {
      return axios
        .put('pages', data)
    },
    removeData(id) {
      return axios
        .delete('page/'+id)
    }
  },
  pages: {
    getData(data) {
      return axios
        .get('pages', {
          params: data
        })
    }
  },
  users: {
    getData() {
      return axios
        .get('users')
    }
  },
  changelog: {
    /**
     * 获取所有 changelog
     * @returns {*}
     */
    getAll(params) {
      return axios
        .get('changelogs', {
          params: params
        })
    },
    /**
     * 获取最新的 changelog
     * @returns {*}
     */
    getRecent() {
      return axios
        .get('changelogs', {
          params: {
            size: 5,
            page: 1
          }
        })
    }
  },
  /**
   * 发布项目
   * @returns {Promise}
   */
  publish(id, data) {
    return axios
        .put('publish/'+id, data)
  },
  /**
   * 获取 制作中和已发布 的项目
   * @returns {Promise}
   */
  count() {
    return axios
        .get('count')
  }
}
