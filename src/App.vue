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
