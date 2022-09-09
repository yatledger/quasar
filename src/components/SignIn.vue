<script setup lang="ts">
import { ref, computed } from 'vue'
import { userStore } from 'stores/user'
import { useRouter } from 'vue-router'
import { sign, secretbox } from 'tweetnacl'
import { pbkdf2 } from '@noble/hashes/pbkdf2'
import { sha512 } from '@noble/hashes/sha512'
import { base58 } from '@scure/base'

const user = userStore()
const router = useRouter()

const pwd = ref('')
const isPwd = ref(true)

const signin = async () => {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  const k = pbkdf2(sha512, Uint8Array.from(encoder.encode(pwd.value)), Uint8Array.from([]), { c: 2048, dkLen: 32 })
  // @ts-expect-error: Bad secretbox types
  const mn = decoder.decode(secretbox.open(base58.decode(user.crypt), new Uint8Array(24), k))
  console.log(mn)
  const seed = pbkdf2(sha512, Uint8Array.from(encoder.encode(mn)), Uint8Array.from([]), { c: 2048, dkLen: 32 })
  const keys = sign.keyPair.fromSeed(seed)
  user.sk = keys.secretKey
  user.pk = base58.encode(keys.publicKey)
  user.seed = mn
  router.push('/')
}
const disabled = computed(() => pwd.value.length < 1)
</script>

<template>
  <q-card>
    <q-card-section>
      <!--TODO: enter key-->
      <q-input
        ref="in"
        v-model="pwd"
        dense
        filled
        counter
        autofocus
        @keyup.enter="signin"
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
      <q-btn ref="ok" flat :disable="disabled" color="primary" @click="signin" :label="$t('ok')" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
