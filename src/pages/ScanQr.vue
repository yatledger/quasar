<template>
  <q-page>
    <q-page-container>
      <div class="q-pa-md">
        <q-btn @click="scanQRCode" label="Сканировать Qr-код" color="primary" />
        <div v-if="scannedResult">
          <p>Scanned Result:</p>
          <p>{{ scannedResult }}</p>
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>

<script>

export default {
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      scannedResult: null
    }
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    scanQRCode() {
      // Use the cordova-plugin-qrscanner API to scan QR code
      window.cordova.plugins.barcodeScanner.scan(
        (result) => {
          this.scannedResult = result.text
        },
        (error) => {
          alert('Scanning failed: ' + error)
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: 'Place a barcode inside the scan area', // Android
          resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
          orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      )
    }
  }
}
</script>
