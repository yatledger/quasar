<script setup>
import { ref, computed } from 'vue'
import { userStore } from 'stores/user'
import { useRouter } from 'vue-router'
import { sign, secretbox } from 'tweetnacl'
import { pbkdf2 } from '@noble/hashes/pbkdf2'
import { sha512 } from '@noble/hashes/sha512'
import * as b58 from 'base58-js'

const user = userStore()
const router = useRouter()

const pwd = ref('')
const isPwd = ref(true)

const signin = async () => {
  const decoder = new TextDecoder()
  const k = pbkdf2(sha512, pwd.value, '', { c: 2048, dkLen: 32 })
  const mn = decoder.decode(secretbox.open(b58.base58_to_binary(user.crypt), new Uint8Array(24), k))
  const seed = pbkdf2(sha512, mn, '', { c: 2048, dkLen: 32 })
  const keys = sign.keyPair.fromSeed(seed)
  user.sk = keys.secretKey
  user.pk = b58.binary_to_base58(keys.publicKey)
  user.seed = mn
  router.push('/')
}
const disabled = computed(() => pwd.value.length < 1)
</script>

<template>
  <q-card>
    <q-card-section>
      <q-input
        v-model="pwd"
        dense
        filled
        counter
        autofocus
        @keyup.enter="prompt = false"
        :type="isPwd ? 'password' : 'text'"
        :placeholder="$t('enter.remember')"
        :hint="$t('enter.hint')"
        :label="$t('password')"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat :label="$t('cancel')" v-close-popup />
      <q-btn flat :disable="disabled" color="primary" @click="signin" :label="$t('ok')" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
