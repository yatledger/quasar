<script setup>
import { ref } from 'vue'
import { sign, secretbox } from 'tweetnacl'
import { generateMnemonic } from '@scure/bip39'
import russian from '../lib/wordlists/russian'
import { pbkdf2 } from '@noble/hashes/pbkdf2'
import { sha512 } from '@noble/hashes/sha512'
import * as b58 from 'base58-js'
// import { wordlist } from '@scure/bip39/wordlists/english'
// https://words.filippo.io/mkcert-valid-https-certificates-for-localhost/
// https://github.com/FiloSottile/mkcert

const pinKey = async (p) => {
  const encoder = new TextEncoder()
  const c = encoder.encode(p)
  const r = await window.crypto.subtle.digest('SHA-256', c)
  const k = await window.crypto.subtle.importKey('raw', new Uint8Array(r), 'AES-CBC', false, ['encrypt', 'decrypt'])
  return k
}

const pinEncrypt = async (p, m) => {
  const encoder = new TextEncoder()
  const c = encoder.encode(m)
  const k = await pinKey(p)
  const v = new Uint8Array(16)
  const e = await window.crypto.subtle.encrypt({ name: 'AES-CBC', iv: v }, k, c)
  const r = new Uint8Array(e)
  return r
}

const pinDecrypt = async (p, m) => {
  const k = await pinKey(p)
  const v = new Uint8Array(16)
  const d = await window.crypto.subtle.decrypt({ name: 'AES-CBC', iv: v }, k, m)
  const r = new Uint8Array(d)
  return r
}

const pin = ref('')
const pk = ref('')

const mn = generateMnemonic(russian).normalize('NFKD')
const seed = pbkdf2(sha512, mn, '', { c: 2048, dkLen: 32 })
const k = sign.keyPair.fromSeed(seed)
pk.value = b58.binary_to_base58(k.publicKey)

const enter = async () => {
  const enc = await pinEncrypt(pin.value, mn)
  console.log(b58.binary_to_base58(enc))
  const dec = await pinDecrypt(pin.value, enc)
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  console.log(decoder.decode(dec))

  const nonce = new Uint8Array(24)
  const k = pbkdf2(sha512, pin.value, '', { c: 2048, dkLen: 32 })
  const sec = secretbox(encoder.encode(mn), nonce, k)
  console.log(b58.binary_to_base58(sec))
  const unsec = secretbox.open(sec, nonce, k)
  console.log(decoder.decode(unsec))
}

</script>

<template>
  <q-page class="flex flex-center">
    <div class="collumn q-pa-md text-center">
      <p class="text-left text-body1">Привет! Добро пожаловать в Ятѣ, систему обмена ценностями. Я уже придумал тебе уникальную мнемоническую фразу - считай её своей цифровой подписью, необходимой для удостоверения себя. Она у меня не хранится и не подлежит восстановлению, теперь её знаешь только ты, поэтому аккуратно запиши её или скопируй ()</p>
      <p class="text-h4">{{ mn }}</p>
      <p class="text-left text-body1">А для взаимодействия со мной и остальными участниками у тебя уже есть свой публичный адрес, который вывелся напрямую из цифровой подписи:</p>
      <p class="text-subtitle1">{{ pk }}</p>
      <q-input v-model="pin" filled counter maxlength="4" placeholder="Четыре цифры" hint="Чтобы защитить подпись" mask="####" label="PIN-код" />
      <q-btn color="primary" size="xl" @click="enter" label="Войти" />
    </div>
  </q-page>
</template>
