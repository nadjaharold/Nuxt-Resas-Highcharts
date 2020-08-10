<template>
  <div class="graph">
    <VueHighcharts ref="lineCharts" :options="vueHighchartsOptions" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import vueHighchartsOptions from '@/mixins/vueHighchartsOptions'

export default {
  name: 'Graph',
  mixins: [vueHighchartsOptions],
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
       */
      setTimeout(() => {
        lineCharts.removeSeries()
        const resultSize = this.getResult.length
        const checkedSize = this.getCheckedPrefCodes.length
        if (checkedSize <= resultSize) {
          this.getResult.forEach((item) => {
            lineCharts.addSeries(item)
          })
          lineCharts.hideLoading()
        } else {
          setTimeout(() => {
            const resultSize2 = this.getResult.length
            const checkedSize2 = this.getCheckedPrefCodes.length
            if (checkedSize2 <= resultSize2) {
              this.getResult.forEach((item) => {
                lineCharts.addSeries(item)
              })
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
}
</style>
