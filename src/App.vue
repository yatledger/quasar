<script setup>
import { useClient } from 'villus'

useClient({
  url: 'http://127.0.0.1:9696/graphql'
})
</script>

<template>
  <router-view />
</template>
