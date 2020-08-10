import { cloneDeep } from 'lodash'

const initialState = {
  prefSet: [], // [{"prefCode":1,"prefName":"北海道"}]
  prefCodes: [], // チェックボックス選択済みの都道府県を格納
}
// ShallowCopyを避けるため、lodashのcloneDeepを用いる。
export const state = () => cloneDeep(initialState)

export const getters = {
  getPrefSet(state) {
    return state.prefSet
  },
  getCheckedPrefCodes(state) {
    return state.prefCodes
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
  // actionUpdatePrefCodesにて使用。チェックボックスの変更に対応して選択済みのprefCodeを更新する。
  mutationUpdatePrefCodes(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.prefCodes = payload
    }
  },
}

export const actions = {
  // mount時に都道府県データを非同期に取得。
  async fetchPrefectures({ commit }) {
    const data = await this.$api.$get('/prefectures')
    if (data.result) commit('initPrefSet', data.result)
  },
  // チェックボックスで変更を検知したら作動。
  actionUpdatePrefCodes({ commit }, newPrefCodes) {
    commit('mutationUpdatePrefCodes', newPrefCodes)
  },
}
