import { mount } from '@vue/test-utils'
import Loading from '@/components/Loading.vue'

describe('Loading', () => {
  const wrapper = mount(Loading)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.classes()).toContain('loading__contents')
  expect(wrapper.is('section')).toBe(true)
})
