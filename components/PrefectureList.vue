<template>
  <section class="checkbox__wrapper">
    <h1>Check the Prefectures!</h1>
    <div class="checkbox__list">
      <v-checkbox
        v-for="(prefSet, index) in getPrefSet"
        :key="index"
        v-model="prefCodes"
        :label="prefSet.prefName"
        name="prefCode"
        color="#f51324"
        :value="prefSet"
        class="checkbox__list--item"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const checked = new Set() // 該当の県コードがデータ取得済みかどうか判定するのに用いる
export default {
  name: 'PrefectureList',
  data() {
    return {
      prefCodes: [],
    }
  },
  computed: {
    ...mapGetters(['getPrefSet']),
  },
  watch: {
    prefCodes(newPrefCodes, oldPrefCodes) {
      this.actionUpdatePrefCodes(newPrefCodes)
      let numCode
      /* チェックボックス押下前後でチェックが外れた項が存在するか確認。
       * 存在しない場合は該当データ取得処理、存在する場合は削除処理を走らせる。
       */
      oldPrefCodes.forEach((item) => {
        let checkExist = false
        newPrefCodes.forEach((item2) => {
          if (item === item2) checkExist = true
        })
        if (!checkExist) {
          numCode = item
        }
      })
      if (!numCode) {
        // データ取得処理。
        // 該当の県コードが既に取得済みデータか判定、取得済みであればスルー。
        if (!checked.has(newPrefCodes)) {
          this.fetchPopulation(newPrefCodes)
          checked.add(newPrefCodes)
        }
      } else {
        // データ削除処理。
        this.actionDeletePref(numCode.prefCode)
        checked.delete(numCode)
      }
    },
  },
  methods: {
    ...mapActions([
      'fetchPopulation',
      'actionUpdatePrefCodes',
      'actionDeletePref',
    ]),
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
