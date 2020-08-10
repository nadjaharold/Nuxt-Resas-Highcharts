<template>
  <section class="checkbox__wrapper">
    <h1>Check the Prefectures!</h1>
    <div class="checkbox__list">
      <v-checkbox
        v-for="(prefSet, index) in getPrefSet"
        :key="index"
        :label="prefSet.prefName"
        color="#f51324"
        class="checkbox__list--item"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PrefectureList',
  computed: {
    ...mapGetters(['getPrefSet']),
  },
}
</script>

<style lang="scss">
.checkbox {
  &__wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &--item {
      display: inline-block;
    }
  }
}
</style>
