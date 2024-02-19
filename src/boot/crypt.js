import { boot } from 'quasar/wrappers'
import { sign, randomBytes } from 'tweetnacl'

export default boot(({ app }) => {
  const crypt = {

    // eslint-disable-next-line space-before-function-paren
    b2h(b) {
      return Array.prototype.map.call(b, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2)
      }).join('')
    },

    // eslint-disable-next-line space-before-function-paren
    h2b(h) {
      if (typeof h !== 'string') throw new TypeError('expected string')
      const b = new Uint8Array(h.length / 2)
      let i = 0
      while (h.length >= 2) {
        b[i] = parseInt(h.substring(0, 2), 16)
        h = h.substring(2, h.length)
        i++
      }
      return b
    },

    // eslint-disable-next-line space-before-function-paren
    u2b(s) {
      if (typeof s !== 'string') throw new TypeError('expected string')
      const d = unescape(encodeURIComponent(s)), b = new Uint8Array(d.length)
      for (let i = 0; i < d.length; i++) b[i] = d.charCodeAt(i)
      return b
    },

    // eslint-disable-next-line space-before-function-paren
    b2u(b) {
      const s = []
      for (let i = 0; i < b.length; i++) s.push(String.fromCharCode(b[i]))
      return decodeURIComponent(escape(s.join('')))
    },

    // eslint-disable-next-line space-before-function-paren
    async genKey() {
      return this.b2h(randomBytes(32))
    },

    // eslint-disable-next-line space-before-function-paren
    async recKey(s) {
      let k = ''
      if (s.length > 64) {
        k = sign.keyPair.fromSecretKey(this.h2b(s)) // legacy
      } else {
        k = sign.keyPair.fromSeed(this.h2b(s))
      }
      const sec = k.secretKey // PRIVATE KEY
      const pub = k.publicKey // PUBLIC KEY
      return [this.b2h(sec), this.b2h(pub)]
    },

    // mes, sec
    // eslint-disable-next-line space-before-function-paren
    sign(m, s) {
      return this.b2h(sign(this.u2b(m), this.h2b(s)))
    },

    // mes, pub
    // eslint-disable-next-line space-before-function-paren
    unsign(m, p) {
      const o = sign.open(this.h2b(m), this.h2b(p))

      if (o) {
        return this.b2u(o)
      } else {
        return false
      }
    }
  }

  app.config.globalProperties.$crypt = crypt
})
