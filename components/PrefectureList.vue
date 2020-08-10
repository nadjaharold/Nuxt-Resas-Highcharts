<template>
  <section class="checkbox__wrapper">
    <h1>都道府県一覧</h1>
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
