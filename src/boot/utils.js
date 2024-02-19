import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  const utils = {
    // eslint-disable-next-line space-before-function-paren
    randomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    },
    // eslint-disable-next-line space-before-function-paren
    copy(txt) {
      console.log(txt)
    }
  }

  app.config.globalProperties.$utils = utils
})
