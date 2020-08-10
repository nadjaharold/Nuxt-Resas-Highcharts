<template>
  <div class="graph">
    <VueHighcharts ref="lineCharts" :options="vueHighchartsOptions" />
  </div>
</template>
<script>
import vueHighchartsOptions from '@/mixins/vueHighchartsOptions'

export default {
  name: 'Graph',
  mixins: [vueHighchartsOptions],
  mounted() {
    this.initLoad()
  },
  methods: {
    initLoad() {
      const lineCharts = this.$refs.lineCharts
      lineCharts.delegateMethod('showLoading', 'Loading...')
      lineCharts.addSeries([])
      lineCharts.removeSeries()
      lineCharts.hideLoading()
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
