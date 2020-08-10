<template>
  <div class="wrapper">
    <Loading v-if="!isLoadingComplete" />
    <Header />
    <v-main>
      <PrefectureList />
      <Graph />
    </v-main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import PrefectureList from '@/components/PrefectureList'
import Graph from '@/components/Graph.vue'
import Loading from '@/components/Loading.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    Header,
    PrefectureList,
    Graph,
    Loading,
  },
  data() {
    return {
      isLoadingComplete: false,
    }
  },
  mounted() {
    this.fetchPrefectures()
    setTimeout(() => {
      this.isLoadingComplete = true
    }, 1500)
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
  .v-main {
    padding: 30px 0 0 !important;
  }
}
</style>
