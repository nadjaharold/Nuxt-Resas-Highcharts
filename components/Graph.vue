<template>
  <div class="graph">
    <p v-if="errorGet" class="graph__error">
      ※
      データ取得に失敗しました。チェックボックスを再度押すか、リロードしてください。
    </p>
    <VueHighcharts ref="lineCharts" :options="vueHighchartsOptions" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import vueHighchartsOptions from '@/mixins/vueHighchartsOptions'

export default {
  name: 'Graph',
  mixins: [vueHighchartsOptions],
  data() {
    return {
      errorGet: false,
    }
  },
  computed: {
    ...mapGetters(['getCheckedPrefCodes', 'getResult']),
  },
  watch: {
    getCheckedPrefCodes() {
      this.load()
    },
  },
  mounted() {
    this.initLoad()
  },
  methods: {
    ...mapActions(['fetchPopulation']),
    initLoad() {
      const lineCharts = this.$refs.lineCharts
      lineCharts.delegateMethod('showLoading', 'Loading...')
      lineCharts.addSeries([])
      lineCharts.removeSeries()
      lineCharts.hideLoading()
    },
    load() {
      const lineCharts = this.$refs.lineCharts
      lineCharts.delegateMethod('showLoading', 'Loading...')
      /* データ取得に100~300msほどかかるので念の為400ms待つ。
       * 取得できなかったらもう一度600ms待って取得を試みる。Loadingを表示することでリスク許容。
       * それでもデータ取得に失敗した場合には再読み込みを促すエラーメッセージを出力する。
       * また、Highcharts自体の描画処理が重いため、毎回初期化→全て描画は選択数が多い場合に筋が悪い。
       * 上記については選択上限数を20に定めて対応とする。
       * (20本以上の折れ線グラフを限られた描画領域に表示することは視認性を著しく低下させるため、寧ろ制限したい。)
       * もし全選択が要件に含まれるなら毎回初期化をやめ、削除対象の都道府県をstate管理して実装する。
       */
      setTimeout(() => {
        const resultSize = this.getResult.length
        const checkedSize = this.getCheckedPrefCodes.length
        if (checkedSize <= resultSize) {
          lineCharts.removeSeries()
          this.errorGet = false
          this.getResult.forEach((item) => {
            lineCharts.addSeries(item)
          })
          lineCharts.hideLoading()
        } else {
          setTimeout(() => {
            const resultSize2 = this.getResult.length
            const checkedSize2 = this.getCheckedPrefCodes.length
            if (checkedSize2 <= resultSize2) {
              lineCharts.removeSeries()
              this.errorGet = false
              this.getResult.forEach((item) => {
                lineCharts.addSeries(item)
              })
            } else {
              this.errorGet = true
              return this.errorGet
            }
            lineCharts.hideLoading()
          }, 600)
        }
      }, 400)
    },
  },
}
</script>
<style lang="scss">
.graph {
  max-width: 1200px;
  margin: 20px auto 30px;
  &__error {
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #f51324;
    padding: 5px 60px 15px;
    @include breakpoint-min(sm) {
      padding: 5px 15px 15px;
    }
  }
}
</style>
