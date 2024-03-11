<!-- eslint-disable space-before-function-paren -->
<script setup>
import { ref, onMounted } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const previousPage = ref('')
const selectedDevice = ref(null)
const devices = ref([])
const error = ref('')
const result = ref('')
const selectedCamIndex = ref(null)
const detectedCode = ref(false)

previousPage.value = route.params.from || '/'

const goBack = () => {
  router.push(previousPage.value)
}

function onDetect(detectedData) {
  if (detectedData) {
    detectedCode.value = true
  }
  console.log(detectedData)
  result.value = JSON.stringify(detectedData.map((code) => code.rawValue))
}

const switchCamera = () => {
  if (devices.value.length > 1 && devices.value !== null) {
    selectedCamIndex.value = (selectedCamIndex.value + 1) % devices.value.length
    selectedDevice.value = devices.value[selectedCamIndex.value]
  }
}

onMounted(async () => {
  devices.value = (await navigator.mediaDevices.enumerateDevices()).filter(
    ({ kind }) => kind === 'videoinput'
  )

  if (devices.value.length > 0) {
    selectedCamIndex.value = devices.value.length - 1
    selectedDevice.value = devices.value[selectedCamIndex.value]
  }
  console.log(devices)
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

    ctx.lineWidth = 3
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
    <div v-if="selectedDevice !== null">
      {{ devices }}
    </div>
    <!-- <select v-model=" selectedDevice">
    <option v-for="device in devices" :key="device.label" :value="device">
      {{ device.label }}
    </option>
    </select> -->

    <!--  <select v-model="trackFunctionSelected">
        <option v-for="option in trackFunctionOptions" :key="option.text" :value="option">
          {{ option.text }}
        </option>
      </select> -->

    <q-section style="width: 40vh; height: 40vh; margin: 0 auto;">
      <q-item clickable v-ripple rounded style="width: 70px; height: 70px;"
        class="row q-pa-md q-flex justify-center items-center" @click="goBack">
        <q-avatar size="70px" icon="arrow_back" />
      </q-item>
    </q-section>
    <q-section>
      <q-item-section class="row wrap justify-center items-center content-center"
        style="width: 40vh; height: 40vh; border-radius: 20px; border: 6px solid #E9E9E9; margin: 0 auto; margin-bottom: 30px; position: relative;">
        <qrcode-stream style="position: relative; z-index: -1;" :constraints="selectedDevice"
          :track="trackFunctionSelected.value" @error="onError" @detect="onDetect" v-if="selectedDevice !== null">
          <q-section v-if="!detectedCode"
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <q-spinner-grid color="primary" size="2em" />
            <q-tooltip :offset="[0, 8]" />
          </q-section>
          <q-section style="position: absolute; bottom: 2%; right: 2%;">
            <q-avatar clickable v-ripple @click="switchCamera" color="primary" size="40px"
              icon="cameraswitch"></q-avatar>
          </q-section>

        </qrcode-stream>
      </q-item-section>
      <q-section>

        <q-section class="decode-result">
          Last result: <b>{{ result }}</b>
        </q-section>
      </q-section>
      <q-section class="row q-pa-md q-flex justify-around items-center" style="width: 40vh; margin: 0 auto;">
        <q-btn rounded clickable class="" label="Отменить" />
        <q-btn rounded clickable class="" label="Отправить" />
      </q-section>
    </q-section>
    <q-avatar clickable v-ripple @click="switchCamera" color="primary" size="40px" icon="cameraswitch"></q-avatar>
    <q-section>
      <q-item-section v-if="!error" class="error">{{ error }}</q-item-section>
    </q-section>
  </q-section>
</template>
