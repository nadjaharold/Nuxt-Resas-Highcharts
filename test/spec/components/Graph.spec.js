import { mount } from '@vue/test-utils'
import Graph from '@/components/Graph.vue'

describe('Graph', () => {
  describe('データ取得に失敗した場合', () => {
    test('エラーメッセージが表示される', () => {
      const wrapper = mount(Graph)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.classes()).toContain('.graph')
      expect(wrapper.is('div')).toBe(true)
      expect(wrapper.find('.graph__error').html()).toBe(undefined)
    })
  })
})

/*
 * TypeError: lineCharts.delegateMethod is not a function →Highcharts周りのドキュメント読むも苦戦...
 * [Vue warn]: Error in getter for watcher "getCheckedPrefCodes"
 * [Vue warn]: Unknown custom element: <VueHighcharts> - did you register the component correctly?
 * For recursive components, make sure to provide the "name" option. →name指定しても消えない...
 * →テスト完全未経験のため学習コスト高そう。一旦保留とし全体の仕上げを優先。
 *
 */
