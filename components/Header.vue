<template>
  <div>
    <v-app-bar app clipped-left color="primary" class="header">
      <nuxt-link to="/">
        <v-toolbar-title class="white--text header__title">
          <v-icon color="white" class="header__title-icon">mdi-nuxt</v-icon>
          <span>ResasAPI×HighCharts</span>
        </v-toolbar-title>
      </nuxt-link>

      <div class="header__items">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nadjaharold/Nuxt-Resas-Highcharts"
        >
          <v-avatar color="white" size="40">
            <v-icon color="black" class="header__items-icon">mdi-github</v-icon>
          </v-avatar>
        </a>
      </div>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

type Data = {}
type Methods = {}
type Computed = {}
type Props = {}
const options: ThisTypedComponentOptionsWithRecordProps<
  Vue,
  Data,
  Methods,
  Computed,
  Props
> = {
  data() {
    return {}
  },
}
export default Vue.extend(options)
</script>

<style lang="scss">
.header {
  background: #1976d2 !important;
  position: relative !important;

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    &-icon {
      font-size: 20px !important;
      color: #fff !important;
      margin-right: 5px;
    }
  }

  &__items {
    position: absolute;
    right: 15px;

    &-icon {
      font-size: 32px !important;
      background: #fff !important;
      color: #000 !important;
    }
  }
}
</style>
