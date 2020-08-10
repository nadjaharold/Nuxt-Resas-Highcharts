import { cloneDeep } from 'lodash'

const initialState = {
  prefSet: [], // [{"prefCode":1,"prefName":"北海道"}]
}
// ShallowCopyを避けるため、lodashのcloneDeepを用いる。
export const state = () => cloneDeep(initialState)

export const getters = {
  // 都道府県一覧を取得。
  getPrefSet(state) {
    return state.prefSet
  },
}

export const mutations = {
  initPrefSet(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.prefSet = payload
    }
  },
}

export const actions = {
  // mount時に都道府県データを非同期に取得。
  async fetchPrefectures({ commit }) {
    const data = await this.$api.$get('/prefectures')
    if (data.result) commit('initPrefSet', data.result)
  },
}
