<template>
  <div justify="center" align="center" style="width: 100%">
    <h1>Отсканировать QR-код</h1>
    <p class="text-red">{{ error }}</p>
    {{ result }}
    <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
</template>

<script>
import { QrcodeStream } from 'vue3-qrcode-reader'

export default {

  components: { QrcodeStream },

  data: () => {
    return {
      result: '',
      error: ''
    }
  },

  methods: {
    onDecode: (result) => {
      console.log(result)
      const url = new URL(result)
      console.log(url.pathname)
      this.$router.push(url.pathname)
    },

    // eslint-disable-next-line space-before-function-paren
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'Разрешите доступ к камере'
        } else if (error.name === 'NotFoundError') {
          this.error = 'К устройству не подключена камера'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'Используйте HTTPS'
        } else if (error.name === 'NotReadableError') {
          this.error = 'Используется в другом приложении'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'Камера не поддерживается'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'Используйте новейший браузер'
        } else if (error.name === 'InsecureContextError') {
          this.error = 'Незащищённый канал'
        } else {
          this.error = `Ошибка камеры (${error.name})`
        }
      }
    }
  }

}
</script>
