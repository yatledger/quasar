<script setup>
import { ref, computed, watch } from 'vue'
import { userStore } from 'stores/user'
import { sign, secretbox } from 'tweetnacl'
import russian from 'boot/wordlists/russian'
import { wordlist as english } from '@scure/bip39/wordlists/english'
import db from 'boot/db'
import { generateMnemonic } from '@scure/bip39'
import { pbkdf2 } from '@noble/hashes/pbkdf2'
import { sha512 } from '@noble/hashes/sha512'
import * as b58 from 'base58-js'
import { passwordStrength } from 'check-password-strength'
import { useI18n } from 'vue-i18n'

// https://words.filippo.io/mkcert-valid-https-certificates-for-localhost/
// https://github.com/FiloSottile/mkcert

const { t, locale } = useI18n()
console.log(db)
const user = userStore()
console.log(user)

const pwdOptions = [
  {
    id: 0,
    value: t('sign.pwd0'),
    minDiversity: 0,
    minLength: 0
  },
  {
    id: 1,
    value: t('sign.pwd1'),
    minDiversity: 1,
    minLength: 7
  },
  {
    id: 2,
    value: t('sign.pwd2'),
    minDiversity: 2,
    minLength: 7
  },
  {
    id: 3,
    value: t('sign.pwd3'),
    minDiversity: 3,
    minLength: 7
  },
  {
    id: 4,
    value: t('sign.pwd4'),
    minDiversity: 4,
    minLength: 8
  }
]

const pwd = ref('')
const pwdRef = ref(null)
const pk = ref('')
const isPwd = ref(true)

const mn = ref('')
let seed = ''
let keys = ''

const gen = (l) => {
  const wordlist = l === 'ru' ? russian : english
  mn.value = generateMnemonic(wordlist).normalize('NFKD')
  seed = pbkdf2(sha512, mn.value, '', { c: 2048, dkLen: 32 })
  keys = sign.keyPair.fromSeed(seed)
  pk.value = b58.binary_to_base58(keys.publicKey)
}

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

gen(locale.value)
watch(ref(locale), () => gen(locale.value))

const hint = computed(() => pwd.value ? passwordStrength(pwd.value, pwdOptions).value : false)

const disabled = computed(() => pwd.value.length < 7)

</script>

<template>
  <q-page class="flex flex-center">
    <div class="collumn q-pa-md text-center">
      <p class="text-left text-body1">{{ $t("sign.t1") }}</p>
      <p class="text-h4">{{ mn }}</p>
      <p class="text-left text-body1">{{ $t("sign.t2") }}:</p>
      <p class="text-subtitle1">{{ pk }}</p>
      <p class="text-left text-body1">{{ $t("sign.t3") }}</p>
      <q-input
        ref="pwdRef"
        v-model="pwd"
        filled
        counter
        :type="isPwd ? 'password' : 'text'"
        :placeholder="$t('characters')"
        :hint="hint ? hint : $t('sign.protect')"
        :label="$t('password')"
        lazy-rules
        :rules="[
          val => !!val || $t('sign.pwdMust'),
          val => val.length > 6 || $t('sign.pwdMore'),
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
      <q-btn push :disable="disabled" color="primary" size="xl" @click="next" :label="$t('next')" /><br />
      <a href="#">{{ $t("sign.know") }}</a>
    </div>
  </q-page>
</template>
