<template>
  <div>
    <q-input outlined v-model="qrCodetext" label="Outlined" />
    <q-btn color="primary" label="Сгенерировать Qr-код" @click="genQr" />
    <img v-if="show" :src="qrCodeDataURL" alt="QR Code">
  </div>
</template>

<script>
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
      // Создание экземпляра генератора QR-кода
      const qr = QRCode(0, 'M')
      qr.addData(this.qrCodetext)
      qr.make()

      // Получение данных в формате Data URL
      const qrCodeDataURL = qr.createDataURL(10, 0)

      // Обновление состояния компонента для отображения QR-кода
      this.qrCodeDataURL = qrCodeDataURL

      this.show = true
    }
  }
}
</script>
