import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header', () => {
  const wrapper = mount(Header)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.classes()).toContain('header')
  expect(wrapper.is('div')).toBe(true)
  expect(wrapper.classes()).toContain('header__items')
})
