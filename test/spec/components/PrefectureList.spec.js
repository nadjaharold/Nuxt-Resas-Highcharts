import { mount } from '@vue/test-utils'
import PrefectureList from '@/components/PrefectureList.vue'

describe('PrefectureList', () => {
  const wrapper = mount(PrefectureList)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.classes()).toContain('checkbox__wrapper')
  expect(wrapper.is('section')).toBe(true)
  expect(wrapper.classes()).toContain('checkbox__list')
})
