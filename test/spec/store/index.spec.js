import Vuex from 'vuex'
import * as index from '@/store'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash'
import axios from 'axios'

const localVue = createLocalVue()
localVue.use(Vuex)

let mockAxiosGetResult
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
}))

let action
const testedAction = (context = {}, payload = {}) => {
  return index.actions[action].bind({ $axios: axios })(context, payload)
}

describe('store/index.js', () => {
  let store
  let pref1, pref2, code1, code2, res1, res2
  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(index))
    pref1 = { prefCode: '1', prefName: '北海道' }
    pref2 = { prefCode: '2', prefName: '青森県' }
    code1 = { prefCode: '1', prefName: '北海道' }
    code2 = { prefCode: '2', prefName: '青森県' }
    res1 = {
      data: [
        5039206,
        5171800,
        5184287,
        5338206,
        5575989,
        5679439,
        5643647,
        5692321,
        5683062,
        5627737,
        5506419,
        5381733,
        5216615,
        5016554,
        4791592,
        4546357,
        4280427,
        4004973,
      ],
      name: '北海道',
      prefCode: 1,
    }
    res2 = {
      data: [
        1426606,
        1416591,
        1427520,
        1468646,
        1523907,
        1524448,
        1482873,
        1481663,
        1475728,
        1436657,
        1373339,
        1308265,
        1235971,
        1157332,
        1076393,
        993737,
        908974,
        823610,
      ],
      name: '青森県',
      prefCode: 2,
    }
  })

  describe('getters', () => {
    let prefSet, prefCodes, result
    beforeEach(() => {
      prefSet = [pref1, pref2]
      prefCodes = [code1, code2]
      result = [res1, res2]
      store.replaceState({
        prefSet,
        prefCodes,
        result,
      })
    })
    describe('prefSet', () => {
      test('statusがprefSetの県コード・県名を取得できること', () => {
        expect(store.getters.prefSet).toContainEqual(pref1)
        expect(store.getters.prefSet).not.toContainEqual(pref2)
      })
    })
    describe('prefCodes', () => {
      test('statusがprefCodesの県コード・県名を取得できること', () => {
        expect(store.getters.prefCodes).toContainEqual(code1)
        expect(store.getters.prefCodes).not.toContainEqual(code2)
      })
    })
    describe('result', () => {
      test('statusがresultの人口数・県名・県コードを取得できること', () => {
        expect(store.getters.result).toContainEqual(res1)
        expect(store.getters.result).not.toContainEqual(res2)
      })
    })
  })
  describe('actions', () => {
    let commit
    beforeEach(() => {
      commit = store.commit
    })
    describe('fetchPrefectures', () => {
      test('prefSetが取得できること', async (done) => {
        action = 'fetchPrefectures'
        mockAxiosGetResult = {
          fields: {
            prefCode: pref1.prefCode,
            prefName: pref2.prefName,
          },
        }

        await testedAction({ commit })
        expect(store.getters.prefCodes).toContainEqual(pref1)
        done()
      })
    })

    describe('fetchPopulation', () => {
      test('resultが追加されること', async (done) => {
        mockAxiosGetResult = {
          name: `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${res1.prefCode}`,
          fields: {
            name: res1.name,
            prefCode: res1.prefCode,
          },
        }
        action = 'fetchPopulation'
        await testedAction({ commit })
        expect(store.getters.result).toContainEqual(res1)
        done()
      })
    })
  })
})
