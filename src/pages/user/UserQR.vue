<template>
  <div>
    <q-input outlined v-model="qrCodetext" label="Ссылка для qr" />
    <q-btn color="primary" label="Сгенерировать Qr-код" @click="genQr" />
    <div style="display: flex; justify-content: center;">
      <q-img v-if="show" style="width: 70%; border: 15px solid #fff;" :src="qrCodeDataURL" class="q-mt-xl">
      </q-img>
    </div>
  </div>
</template>

<script >
import QRCode from 'qrcode-generator'

export default {
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      qrCodetext: '',
      qrCodeDataURL: '',
      show: false
    }
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    genQr() {
      const qr = QRCode(0, 'M')
      qr.addData(this.qrCodetext)
      qr.make()

      const qrCodeDataURL = qr.createDataURL(10, 0)

      this.qrCodeDataURL = qrCodeDataURL

      this.show = true
    }
  }
}
</script>
