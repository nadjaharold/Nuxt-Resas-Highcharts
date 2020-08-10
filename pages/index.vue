<template>
  <div class="wrapper">
    <PrefectureList />
    <Graph />
  </div>
</template>

<script>
import PrefectureList from '@/components/PrefectureList'
import Graph from '@/components/Graph.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    PrefectureList,
    Graph,
  },
  mounted() {
    this.fetchPrefectures()
  },
  methods: {
    ...mapActions(['fetchPrefectures']),
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>
