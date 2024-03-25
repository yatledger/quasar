<!-- eslint-disable space-before-function-paren -->
<script setup>
import { ref, onMounted } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import modalTx from './modalTx.vue'
import modalErrorMessage from './modalErrorMessage.vue'

const { t } = useI18n()
const $q = useQuasar()

const succesNotification = () => {
  $q.notify({
    type: 'positive',
    message: t('transactionMessage.successfull'),
    color: 'secondary',
    position: 'bottom',
    timeout: 1500
  })
}

const fromValue = { id: 5, nickName: 'Семен', publicKey: 'rEFgH77tJcYPAe2tdPwUPEZ6TS3vvgTmvNUZcfr9JnfU1sTq5i5Xo9BX55L', avatar: 'https://img.goodfon.ru/original/2048x2048/6/c5/zak-efron-aktere-paren-foto.jpg' }
const toValue = { id: 7, nickName: 'Vika', publicKey: '3vvgTmvNUAe2tdPwUPEZ6TSZcfr9JnfU1sTq5i5XorEFgH77tJcYP9BX55L', avatar: 'https://sun6-22.userapi.com/s/v1/if1/Kx0oxhQzfzd4-V1EiwtJIqbzg3r5IjfLnVnqkXOcbV02dLx9FlmKmxOiZaWhcEEJiCrttjZY.jpg?size=1600x1600&quality=96&crop=482,0,1600,1600&ava=1' }

// DEMO transtion
const transactionSum = '18'
const transactionDemo = () => `${transactionSum} ${t('title')}`
// END

const transactionDate = () => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  const currentDate = new Date()
  return currentDate.toLocaleString('ru-RU', options)
}

const route = useRoute()
const router = useRouter()

const previousPage = ref('')
const selectedDevice = ref(null)
const devices = ref([])
const error = ref('')
const errorMessage = ref(null)
const result = ref('')
const selectedCamIndex = ref(null)
const detectedCode = ref(false)
const isShowModalTx = ref(false)
const isShowModalError = ref(false)
const isShowRunCamSpinner = ref(false)
const paused = ref(false)

const reloadPage = () => {
  isShowModalError.value = false
  errorMessage.value = null
  error.value = null
  window.location.reload()
}

const goBack = () => {
  router.push(previousPage.value)
}

const onDetect = async (detectedData) => {
  if (Array.isArray(detectedData) && detectedData.length > 0) {
    detectedCode.value = true
    isShowModalTx.value = true
    paused.value = true
    result.value = JSON.stringify(detectedData.map((code) => code.rawValue))
  } else {
    // Обработка случая, когда detectedData пуст или не массив
    console.error('Detected data is empty or not an array:', detectedData)
  }
}

const switchCamera = async () => {
  if (devices.value.length > 1 && devices.value !== null) {
    if (selectedCamIndex.value === 0) {
      selectedCamIndex.value = await (selectedCamIndex.value + 1) % devices.value.length
    } else {
      selectedCamIndex.value = await 0
    }
    selectedDevice.value = await devices.value[selectedCamIndex.value]
  }
}

const onCameraOn = () => {
  if (!isShowModalTx.value) {
    isShowRunCamSpinner.value = false
  }
}

const onCameraOff = () => {
  isShowRunCamSpinner.value = false
}

const onError = (err) => {
  error.value = `[${err.name}]: `

  /* const errorType = {
    NotAllowedError: () => (accessCamera.value = 'blocked'),
    NotFoundError: '',
    NotSupportedError: '',
    NotReadableError: '',
    OverconstrainedError: '',
    StreamApiNotSupportedError: '',
    InsecureContextError: ''
  }

  return errorType[err.name] */

  if (err.name === 'NotAllowedError') {
    error.value = 'NotAllowedError'
    isShowModalError.value = true
    errorMessage.value = {
      header: t('errorMessages.scanQr.NotAllowedError.headerErr'),
      text: t('errorMessages.scanQr.NotAllowedError.textErr')
    }
  } else if (err.name === 'NotFoundError') {
    error.value += 'no camera on this device'
  } else if (err.name === 'NotSupportedError') {
    error.value += 'secure context required (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value += 'is the camera already in use?'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'installed cameras are not suitable'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'Stream API is not supported in this browser'
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
  } else if (err === 'Permission denied') {
    error.value = 'Permission denied'
  } else {
    error.value += err.message
  }
}

const requestCameraAccess = async () => {
  try {
    isShowModalError.value = false
    errorMessage.value = null
    error.value = null
    isShowRunCamSpinner.value = true
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { userGesture: true } })
    mediaStream.disableCameraStorage = true
    const track = mediaStream.getVideoTracks()[0]
    const devicesList = await navigator.mediaDevices.enumerateDevices()
    devices.value = devicesList.filter(device => device.kind === 'videoinput')
    if (devices.value.length > 0) {
      selectedDevice.value = devices.value.at(-1)
    }
    if (result.value) {
      track.stop()
    }
  } catch (err) {
    onError(err)
    isShowRunCamSpinner.value = false
  }
}

onMounted(async () => {
  previousPage.value = route.params.from || '/'
  await requestCameraAccess()
})

const cancelClick = () => {
  result.value = ''
  detectedCode.value = false
  isShowModalTx.value = false
  paused.value = false
}

const confirmClick = () => {
  result.value = ''
  detectedCode.value = false
  isShowModalTx.value = false
  paused.value = false
  succesNotification()
}

function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}
function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}
const paintCenterText = (detectedCodes, ctx) => {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode

    const centerX = boundingBox.x + boundingBox.width / 2
    const centerY = boundingBox.y + boundingBox.height / 2

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = 'center'

    ctx.lineWidth = 8
    ctx.strokeStyle = '#35495e'
    ctx.strokeText(detectedCode.rawValue, centerX, centerY)

    ctx.fillStyle = '#5cb984'
    ctx.fillText(rawValue, centerX, centerY)
  }
}
const trackFunctionOptions = [
  { text: 'nothing (default)', value: undefined },
  { text: 'outline', value: paintOutline },
  { text: 'centered text', value: paintCenterText },
  { text: 'bounding box', value: paintBoundingBox }
]
const trackFunctionSelected = ref(trackFunctionOptions[1])
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}

.barcode-format-checkbox {
  margin-right: 10px;
  white-space: nowrap;
}
</style>

<template>
  <q-section class="q-pa-md">
    <q-section style="width: 350px; height: 350px; margin: 0 auto;">
      <q-item clickable v-ripple rounded style="width: 70px; height: 70px;"
        class="row q-pa-md q-flex justify-center items-center" @click="goBack">
        <q-avatar size="70px" icon="arrow_back" />
      </q-item>
    </q-section>
    <q-section>
      <div class="row wrap justify-center items-center content-center"
        style="width: 350px; height: 350px; border-radius: 20px; border: 6px solid #E9E9E9; margin: 0 auto; margin-bottom: 30px; position: relative;">

        <qrcode-stream :paused="paused" @camera-on="onCameraOn" @camera-off="onCameraOff"
          style="position: relative; z-index: -1;" :constraints="selectedDevice" :track="trackFunctionSelected.value"
          @error="onError" @detect="onDetect" v-if="selectedDevice !== null">
          <q-section v-if="isShowRunCamSpinner"
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <q-spinner-grid color="primary" size="2rem" />
            <q-tooltip :offset="[0, 8]" />
          </q-section>
        </qrcode-stream>

        <q-section style="position: absolute; bottom: 2%; right: 2%;">
          <q-avatar clickable v-ripple @click="switchCamera" size="60px" style="color:indianred;"
            icon="cameraswitch"></q-avatar>
        </q-section>
      </div>
    </q-section>
    <div v-if="error === 'NotAllowedError'" class="row q-pa-md q-flex justify-around items-center"
      style="max-width: 90%; margin: 0 auto;">
      <q-chip class="q-mb-md" clickable @click="reloadPage" size="md">
        <q-avatar icon="restart_alt" color="primary" text-color="white" />
        Перезагрузить страницу
      </q-chip>
      <q-chip clickable @click="requestCameraAccess" size="md">
        <q-avatar icon="photo_camera" color="primary" text-color="white" />
        Запросить доступ к камере
      </q-chip>
    </div>
  </q-section>
  <modalErrorMessage v-model="isShowModalError" :errMessage="errorMessage" />
  <modalTx :fromValue="fromValue" :toValue="toValue" :confirmClick="confirmClick" :cancelClick="cancelClick"
    :transactionDate="transactionDate" :transactionDemo="transactionDemo" v-model="isShowModalTx" />
</template>
