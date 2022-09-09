import 'fake-indexeddb/auto'
import { createTestingPinia } from '@pinia/testing'
import { userStore } from 'stores/user'
import { describe, expect, it, jest } from '@jest/globals'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest'
import { config, mount } from '@vue/test-utils'
import SignIn from 'components/SignIn.vue'
import { useRouter } from 'vue-router'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
// @ts-ignore
global.TextDecoder = TextDecoder

jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({
    push: () => { '' }
  }))
}))

const $t = jest.fn()
$t.mockReturnValue('') // <= will always return an empty string

// Global mock
config.global.mocks.$t = $t

installQuasarPlugin()
describe('SignIn', () => {
  it('is vue component', async () => {
    const push = jest.fn()
    // @ts-ignore
    useRouter.mockImplementationOnce(() => ({
      push
    }))
    const wrapper = mount(SignIn, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            user: { crypt: 'rPo8QtYuKqWbwBViCpFJoRSyE3XUq1jFhCGzFgRRB162BG1SZ5CCe4p8DHvV66iyQLnXy4KidQUxQfVZZqHMhbFufyEvabYt2NnYndWy1KaBva1xpmWNPksAPBUf7KCcUgSPyj7URC3VAZ4aBu3Ja6qjxUtDmZWVbeFE3gG1foX7Hf8dTJawgq9fk7QuX9LAjSY9cjaebbdFJfqrkeezuZVCRA3G5EEzWvJg3myPRXFP' }
          }
        })],
        mocks: { $t }
      }
    })
    const store = userStore()
    const inp = wrapper.findComponent({ ref: 'in' })
    await inp.setValue('21qwe12')
    const ok = wrapper.findComponent({ ref: 'ok' })
    await ok.trigger('click')
    console.log(store.sk)
    expect(store.sk).toHaveLength(64)
  })
})
