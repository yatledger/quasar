<script setup>
import { ref, computed } from 'vue'
import { userStore } from '../stores/user'
import { sign, secretbox } from 'tweetnacl'
import russian from '../lib/wordlists/russian'
import db from '../lib/db'
import { generateMnemonic } from '@scure/bip39'
import { pbkdf2 } from '@noble/hashes/pbkdf2'
import { sha512 } from '@noble/hashes/sha512'
import * as b58 from 'base58-js'
import { passwordStrength } from 'check-password-strength'
// import { wordlist } from '@scure/bip39/wordlists/english'
// https://words.filippo.io/mkcert-valid-https-certificates-for-localhost/
// https://github.com/FiloSottile/mkcert

console.log(db)
const user = userStore()
console.log(user)

const pwdOptions = [
  {
    id: 0,
    value: 'Слишком простой',
    minDiversity: 0,
    minLength: 0
  },
  {
    id: 1,
    value: 'Простой',
    minDiversity: 1,
    minLength: 7
  },
  {
    id: 2,
    value: 'Средний пароль',
    minDiversity: 2,
    minLength: 7
  },
  {
    id: 3,
    value: 'Надёжный пароль',
    minDiversity: 3,
    minLength: 8
  }
]

const pwd = ref('')
const pwdRef = ref(null)
const pk = ref('')
const isPwd = ref(true)

const mn = generateMnemonic(russian).normalize('NFKD')
const seed = pbkdf2(sha512, mn, '', { c: 2048, dkLen: 32 })
const keys = sign.keyPair.fromSeed(seed)
pk.value = b58.binary_to_base58(keys.publicKey)

const next = async () => {
  pwdRef.value.validate()
  if (pwdRef.value.hasError) {
    return
  }
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  const k = pbkdf2(sha512, pwd.value, '', { c: 2048, dkLen: 32 })
  const enc = secretbox(encoder.encode(mn), new Uint8Array(24), k)
  console.log(b58.binary_to_base58(enc))
  db.set('settings', 'seed', b58.binary_to_base58(enc))
  user.sk = keys.secretKey
  user.pk = pk.value
  const dec = secretbox.open(enc, new Uint8Array(24), k)
  console.log(decoder.decode(dec))
}

const hint = computed(() => {
  if (pwd.value) {
    return passwordStrength(pwd.value, pwdOptions).value
  } else {
    return 'Чтобы защитить подпись'
  }
})

const disabled = computed(() => pwd.value.length < 7)

</script>

<template>
  <q-page class="flex flex-center">
    <div class="collumn q-pa-md text-center">
      <p class="text-left text-body1">Привет! Добро пожаловать в Ятѣ, систему обмена ценностями. Я уже придумал тебе уникальную мнемоническую фразу - считай её своей цифровой подписью, необходимой для удостоверения себя. Она у меня не хранится и потому не подлежит восстановлению. Теперь её знаешь только ты, поэтому аккуратно запиши её на бумаге или хотябы скопируй () и вставь куда-то.</p>
      <p class="text-h4">{{ mn }}</p>
      <p class="text-left text-body1">А для взаимодействия со мной и остальными участниками у тебя уже есть свой публичный адрес, который вывелся напрямую из цифровой подписи:</p>
      <p class="text-subtitle1">{{ pk }}</p>
      <p class="text-left text-body1">Осталось только ввести и запомнить надёжный</p>
      <q-input
        ref="pwdRef"
        v-model="pwd"
        filled
        counter
        :type="isPwd ? 'password' : 'text'"
        placeholder="Цифры, буквы, знаки"
        :hint=hint
        label="Пароль"
        lazy-rules
        :rules="[
          val => !!val || 'Лучше введите пароль!',
          val => val.length > 6 || 'Лучше ведите больше 6 символов',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn push :disable="disabled" color="primary" size="xl" @click="next" label="Продолжить" /><br />
      <a href="#">Я помню свою фразу!</a>
    </div>
  </q-page>
</template>
