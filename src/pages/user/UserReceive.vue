<template>
  <div class="wrapper">
    <div class="scan-adress">
      <div>
        <q-img
          src="/icons/qr-example.png"
          spinner-color="white"
          style="height: 100px; max-width: 100px"
        />
        <p class="q-mt-lg">Scane address to receive payment</p>
        <q-card class="scan-adress__card">
          <span>0x7aCaaba8238....96eE19</span>
          <q-img
            src="/icons/attach-icon.svg"
            style="height: 20px; max-width: 20px"
          />
        </q-card>
      </div>
      <q-btn color="primary" label="Request payment" />
    </div>
  </div>
</template>

<script setup>

</script>

<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: calc(100vh - 56px);
}
.scan-adress {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
}
.scan-adress__card {
  width: 336px;
  padding: 11px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.scan-adress__card span {
  font-size: 16px;
}
</style>
