<template>
  <div class="wrapper">
    <PrefectureList />
  </div>
</template>

<script>
import PrefectureList from '@/components/PrefectureList'
import { mapActions } from 'vuex'
export default {
  components: {
    PrefectureList,
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
