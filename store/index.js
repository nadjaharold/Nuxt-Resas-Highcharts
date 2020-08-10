import { cloneDeep } from 'lodash'

const initialState = {
  prefSet: [], // 47都道府県全ての県コード/県名を格納。[{"prefCode":1,"prefName":"北海道"}]
  prefCodes: [], // チェックボックス選択済みの県コード/県名を格納。[{"prefCode":1,"prefName":"北海道"}]
  result: [], // グラフ描画用のデータを格納。[{"data":[5039206,5171800,...],"name":"北海道","prefCode":1}]
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
   * Highcharts描画用に人口数配列/県名/県コードをresに格納しresultにpush。
   */
  setPopulation(state, data) {
    const prefPopulationValue = data.result.data[0].data.map(
      (object) => object.value
    )
    const name = data.prefNameString
    const prefCode = data.prefCodeNumber
    const res = {
      data: prefPopulationValue,
      name,
      prefCode,
    }
    state.result.push(res)
  },
  // actionUpdatePrefCodesにて使用。チェックボックスの変更に対応して選択済みの都道府県一覧を更新する。
  mutationUpdatePrefCodes(state, payload) {
    if (payload === null) {
      state = cloneDeep(initialState)
    } else {
      state.prefCodes = payload
    }
  },
  // 押下済みのチェックボックスがクリックされた時に作動。押下された都道府県データをresultから削除する。
  mutationDeletePref(state, numCode) {
    const arrayResult = state.result.filter((n) => {
      if (n.prefCode !== numCode) {
        return n
      }
    })
    state.result = arrayResult
  },
}

export const actions = {
  // mount時に都道府県データを非同期に取得。
  async fetchPrefectures({ commit }) {
    const data = await this.$api.$get(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures'
    )
    if (data.result) commit('initPrefSet', data.result)
  },
  /* 1件取得するのに約100~300ms要するので初回に47件分一気に読み込むとロードが長くなる。
   * チェックボックス選択時に選択した1件のみ取得するようにする。
   * axios-extensionsを用いて一度取得したらデータキャッシュするように実装済。
   */
  async fetchPopulation({ commit, getters }, prefCode) {
    const num = prefCode.length - 1
    const prefCodeNumber = prefCode[num].prefCode

    const data = await this.$api.$get(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCodeNumber}`
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
  // チェックボックスで変更を検知したら作動。
  actionDeletePref({ commit }, numCode) {
    commit('mutationDeletePref', numCode)
  },
}
