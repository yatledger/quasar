<script setup>
import { useClient } from 'villus'

useClient({
  url: 'http://127.0.0.1:9696/graphql'
})
// TODO: dev gql
// TODO: language-packs
// https://quasar.dev/options/quasar-language-packs
// TODO: remember
// TODO: tx
</script>

<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');

h2 {
  font-family: 'Roboto Slab', serif;
  font-size: 20px;
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
