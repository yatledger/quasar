import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  const utils = {
    randomInt (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    },
    copy (txt) {
      console.log(txt)
    }
  }

  app.config.globalProperties.$utils = utils
})
