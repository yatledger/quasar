import { boot } from 'quasar/wrappers'
import ky from 'ky'

export default boot(({ app }) => {
  const srv = import.meta.env.VITE_REST_SERVER

  const fetch = {
    async balance (url) {
      const res = await fetch(url)
      const b = await res.json()
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
    async send (q) {
      try {
        const res = await fetch(srv + "send/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(q)
        })
        return await res.json()
      } catch (e) {
        console.error(e)
        return { success: 0 }
      }
    }
  }

  app.config.globalProperties.$fetch = fetch
})
