import { cloneDeep } from 'lodash'

const initialState = {
  prefSet: [], // [{"prefCode":1,"prefName":"北海道"}]
  prefCodes: [], // チェックボックス選択済みの都道府県を格納
  result: [],
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
  getResult(state) {
    return state.result
  },
  // fetchPopulationにて使用。都道府県一覧の中から、チェックボックス選択済みの都道府県名を取得。
  getPrefNameByCode: (state) => (id) => {
    return state.prefSet.find((item) => item.prefCode === id.prefCode).prefName
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
  /* fetchPopulationにて使用。
   * データ取得が成功したら県コード/年度配列/人口数配列をobjに格納しprefPopulationにpush。
   * 同様にHighcharts描画用に人口数配列/県名/県コードをresに格納しresultにpush。
   */
  setPopulation(state, data) {
    const prefPopulationValue = data.result.data[0].data.map(
      (object) => object.value
    )
    const name = data.prefNameString
    const prefectureCode = data.prefCodeNumber
    const res = {
      data: prefPopulationValue,
      name,
      prefectureCode,
    }
    state.result.push(res)
    // console.log(JSON.stringify(state.result))
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
  /* 1件取得するのに約100~300ms要するので初回に47件分一気に読み込むとロードが長くなる。
   * チェックボックス選択時に洗濯した1件のみ取得するようにする。
   */
  async fetchPopulation({ commit, getters }, prefCode) {
    const num = prefCode.length - 1
    const prefCodeNumber = prefCode[num].prefCode

    const data = await this.$api.$get(
      `/population/composition/perYear?prefCode=${prefCodeNumber}`
    )
    if (data.result) {
      const prefNameString = getters.getPrefNameByCode(prefCode[num])
      commit('setPopulation', {
        result: data.result,
        prefCodeNumber,
        prefNameString,
      })
    }
  },
  // チェックボックスで変更を検知したら作動。
  actionUpdatePrefCodes({ commit }, newPrefCodes) {
    commit('mutationUpdatePrefCodes', newPrefCodes)
  },
}
