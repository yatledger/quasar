<script setup>
// TODO: dev gql
// TODO: language-packs
// https://quasar.dev/options/quasar-language-packs
// TODO: remember
// TODO: tx
// https://testing.quasar.dev/
</script>

<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

h1 {
  font-family: 'Roboto Slab', serif;
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 1vh;
  line-height: 1.5;
}

h2 {
  font-family: 'Roboto Slab', serif;
  font-size: 25px;
  font-weight: normal;
  margin-bottom: 1vh
}

p {
  font-family: 'Roboto Slab', serif;
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 0.5vh;
  line-height: 20px;
}

a {
  color: #ac5de7;
  text-decoration: underline;
}

p,
li {
  margin-bottom: 10px;
}

ul {
  list-style: none;
}

img {
  max-width: 100%
}

.raw_txt {
  white-space: pre-line;
  word-wrap: break-word;
}
</style>
