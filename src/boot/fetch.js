import { boot } from 'quasar/wrappers'
import ky from 'ky'

export default boot(({ app }) => {
  const srv = import.meta.env.VITE_REST_SERVER

  const fetch = {
    // eslint-disable-next-line space-before-function-paren
    async balance(url) {
      const b = parseInt(await ky.get(url).json())
      let s = 10
      if (b > 99999) {
        s = 7
      }
      if (b > 9999999) {
        s = 6
      }
      if (b > 999999999) {
        s = 5
      }
      return [b.toLocaleString(), s]
    },
    // eslint-disable-next-line space-before-function-paren
    async send(q) {
      try {
        return await ky.post(srv + 'send/', { json: q }).json()
      } catch (e) {
        console.error(e)
        return { success: 0 }
      }
    }
  }

  app.config.globalProperties.$fetch = fetch
})
