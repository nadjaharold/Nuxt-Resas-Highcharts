<template>
  <section>
    <div class="contents">
      <h1>Now Loading...</h1>
      <atom-spinner
        v-if="!isLoadingComplete"
        :animation-duration="600"
        :size="70"
        color="#ff1d5e"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { AtomSpinner } from 'epic-spinners'

type Data = {
  isLoadingComplete: boolean
}
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
  components: {
    AtomSpinner,
  },
  data() {
    return {
      isLoadingComplete: false,
    }
  },
}
export default Vue.extend(options)
</script>

<style lang="scss" scoped>
.contents {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  background: #fff;
  transition: all 0.5s;
  h1 {
    margin: 0 20px 0 0;
  }
}
</style>
