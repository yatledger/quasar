<template>
  <div class="qr">
    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>
    <q-btn color="primary" label="Сканировать QR-код" @click="scan"></q-btn>
    <div id="reader"></div>
  </div>
</template>
<script>

import { Html5Qrcode } from 'html5-qrcode'

export default {
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      result: '',
      html5QrCode: null,
      scanerConfig: {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250
        }
      }
    }
  },

  methods: {
    // eslint-disable-next-line space-before-function-paren
    scan() {
      this.html5QrCode = new Html5Qrcode('reader')

      this.html5QrCode.start({ facingMode: 'environment' }, this.scanerConfig, this.onScanSuccess)
    },
    // eslint-disable-next-line space-before-function-paren
    onScanSuccess(decodedText) {
      this.result = decodedText
      this.onStop()
    },
    // eslint-disable-next-line space-before-function-paren
    onScanFailure(error) {
      console.warn(`Code scan error = ${error}`)
    },
    // eslint-disable-next-line space-before-function-paren
    onStop() {
      this.html5QrCode.stop().then((ignore) => {
        console.log(ignore)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#reader {
  width: 400px;
}
</style>
