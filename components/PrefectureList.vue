<template>
  <section class="checkbox__wrapper">
    <v-card elevation="3">
      <h1>
        Check the Prefectures!
        <span>選択数の上限: 20, 現在の選択数: {{ prefCodes.length }}</span>
        <span v-if="prefCodes.length > 20" class="over">
          ※
          選択可能上限数を超えました。いずれかのチェックを外すか、リロードしてください。
        </span>
      </h1>
      <div class="checkbox__list">
        <v-checkbox
          v-for="(prefSet, index) in getPrefSet"
          :key="index"
          v-model="prefCodes"
          :label="prefSet.prefName"
          color="#f51324"
          :value="prefSet"
          class="checkbox__list--item"
        />
      </div>
    </v-card>
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
    ...mapGetters(['getPrefSet', 'getCheckedPrefCodes']),
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
        const checkedSize = this.getCheckedPrefCodes.length
        // チェックボックス選択数が20を超えている場合は更新処理を走らせない。
        if (checkedSize < 21) {
          // データ取得処理。
          // 該当の県コードが既に取得済みデータか判定、取得済みであればスルー。
          if (!checked.has(newPrefCodes)) {
            this.fetchPopulation(newPrefCodes)
            checked.add(newPrefCodes)
          }
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
    @include breakpoint-min(xxl) {
      width: calc(100% - 60px);
    }
    @include breakpoint-min(sm) {
      width: calc(100% - 30px);
    }
    h1 {
      padding: 20px 60px 10px;
      @include breakpoint-min(xxl) {
        padding: 20px 30px 5px;
      }
      @include breakpoint-min(sm) {
        padding: 20px 10px 5px;
      }
      span {
        font-size: 16px;
        color: #333333;
        padding: 0 0 0 15px;
        @include breakpoint-min(sm) {
          font-size: 14px;
          display: block;
          padding: 10px 0 0 0px;
        }
      }
      .over {
        display: block;
        color: #f51324;
        padding: 10px 0 0 0;
      }
    }
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0px 60px 20px;
    @include breakpoint-min(xxl) {
      padding: 0px 30px 20px;
    }
    @include breakpoint-min(sm) {
      padding: 0px 10px 20px;
    }
    &--item {
      display: inline-block;
      margin: 16px 8px 0 0;
      @include breakpoint-min(xxl) {
        margin: 8px 4px 0 0;
      }
      .v-input {
        &__slot {
          margin: 0;
        }
      }
    }
  }
}
</style>
