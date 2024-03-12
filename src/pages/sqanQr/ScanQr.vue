<!-- eslint-disable space-before-function-paren -->
<script setup>
import { ref, onMounted } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useRoute, useRouter } from 'vue-router'

const fromValue = { id: 5, nickName: 'Семен', publicKey: 'rEFgH77tJcYPAe2tdPwUPEZ6TS3vvgTmvNUZcfr9JnfU1sTq5i5Xo9BX55L', avatar: 'https://img.goodfon.ru/original/2048x2048/6/c5/zak-efron-aktere-paren-foto.jpg' }
const toValue = { id: 7, nickName: 'Vika', publicKey: '3vvgTmvNUAe2tdPwUPEZ6TSZcfr9JnfU1sTq5i5XorEFgH77tJcYP9BX55L', avatar: 'https://sun6-22.userapi.com/s/v1/if1/Kx0oxhQzfzd4-V1EiwtJIqbzg3r5IjfLnVnqkXOcbV02dLx9FlmKmxOiZaWhcEEJiCrttjZY.jpg?size=1600x1600&quality=96&crop=482,0,1600,1600&ava=1' }

const route = useRoute()
const router = useRouter()

const previousPage = ref('')
const selectedDevice = ref(null)
const devices = ref([])
const error = ref('')
const result = ref('')
const selectedCamIndex = ref(null)
const detectedCode = ref(false)
const confirmTransaction = ref(false)
const isShowRunCamSpinner = ref(false)

previousPage.value = route.params.from || '/'

const goBack = () => {
  router.push(previousPage.value)
}

function onDetect(detectedData) {
  if (detectedData) {
    detectedCode.value = true
    confirmTransaction.value = true
  }
  result.value = JSON.stringify(detectedData.map((code) => code.rawValue))
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

const onReady = () => {
  isShowRunCamSpinner.value = false
}

onMounted(async () => {
  try {
    isShowRunCamSpinner.value = true
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
    const track = mediaStream.getVideoTracks()[0]
    const devicesList = await navigator.mediaDevices.enumerateDevices()
    devices.value = devicesList.filter(device => device.kind === 'videoinput')
    if (devices.value.length > 0) {
      selectedDevice.value = devices.value.at(-1)
    }
    track.stop()
  } catch (error) {
    isShowRunCamSpinner.value = false
    console.error('Error accessing media devices:', error)
    error.value = 'Error accessing media devices'
  }
})

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

function onError(err) {
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    error.value += 'you need to grant camera access permission'
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
  } else {
    error.value += err.message
  }
}
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
    <q-section style="width: 40vh; height: 40vh; margin: 0 auto;">
      <q-item clickable v-ripple rounded style="width: 70px; height: 70px;"
        class="row q-pa-md q-flex justify-center items-center" @click="goBack">
        <q-avatar size="70px" icon="arrow_back" />
      </q-item>
    </q-section>
    <q-section>
      <div class="row wrap justify-center items-center content-center"
        style="width: 40vh; height: 40vh; border-radius: 20px; border: 6px solid #E9E9E9; margin: 0 auto; margin-bottom: 30px; position: relative;">
        <qrcode-stream @camera-on="onReady" style="position: relative; z-index: -1;" :constraints="selectedDevice"
          :track="trackFunctionSelected.value" @error="onError" @detect="onDetect" v-if="selectedDevice !== null">
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
      <!-- <q-item-section>
        <q-item class="decode-result">
          Last result: <b>{{ result }}</b>
        </q-item>
      </q-item-section> -->
    </q-section>
    <q-section>
      <q-item-section v-if="!error" class="error">{{ error }}</q-item-section>
    </q-section>
  </q-section>
  <q-dialog persistent v-model="confirmTransaction">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar>
          <img :src="fromValue.avatar" alt="transction-from" />
        </q-avatar>
        <q-item>
          <p>{{ fromValue.nickName }}</p>
        </q-item>
      </q-card-section>
      <q-card-section class="row items-center">
        <q-avatar>
          <img :src="toValue.avatar" alt="transction-to" />
        </q-avatar>
        <q-item>
          <p>{{ toValue.nickName }}</p>
        </q-item>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
