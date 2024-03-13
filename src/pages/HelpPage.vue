<script setup>
import { ref } from 'vue'

const step = ref(1)

const maxSteps = 3

const nextStep = () => {
  if (step.value < maxSteps) {
    step.value += 1
  } else {
    step.value = 1
  }
}

const prevStep = () => {
  if (step.value > 1) {
    step.value -= 1
  } else {
    step.value = maxSteps
  }
}
</script>

<template>
  <div class="q-pa-md">

    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step :name="1" :title="$t('aboutPlatform.navHeaderItems.openness')" icon="diversity_3"
        active-icon="diversity_3" done-icon="diversity_3" done-color="red-11" :done="step > 1"
        style="min-height: 200px;">
        <p>
          {{ $t('aboutPlatform.opennessText.p1') }}
        </p>
        <p>
          {{ $t('aboutPlatform.opennessText.p2') }}
        </p>
      </q-step>

      <q-step :name="2" :title="$t('aboutPlatform.navHeaderItems.free')" icon="accessibility_new"
        active-icon="accessibility_new" done-icon="accessibility_new" done-color="red-11" :done="step > 2"
        style="min-height: 200px;">
        <p>{{ $t('aboutPlatform.freeText') }}</p>
      </q-step>

      <q-step :name="3" :title="$t('aboutPlatform.navHeaderItems.security')" icon="verified_user"
        active-icon="verified_user" done-icon="verified_user" done-color="red-11" style="min-height: 200px;">
        <p>
          {{ $t('aboutPlatform.securityText.p1') }}
        </p>
        <p>
          {{ $t('aboutPlatform.securityText.p2') }}
        </p>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <div class="row justify-around q-pa-md q-flex q-justify-around">
            <q-avatar size="50px" icon="arrow_back_ios_new" v-ripple clickable @click="prevStep" />
            <q-avatar size="50px" icon="arrow_forward_ios" v-ripple clickable @click="nextStep" />
          </div>
        </q-stepper-navigation>
      </template>

      <template v-slot:message>
        <q-banner rounded v-if="step === 1" class="bg-grey-2 text-grey-14 q-px-lg q-ma-md">
          {{ $t('aboutPlatform.bannerTexts.banner1') }}
        </q-banner>
        <q-banner rounded v-else-if="step === 2" class="bg-grey-2 text-grey-14 q-px-lg q-ma-md">
          {{ $t('aboutPlatform.bannerTexts.banner1') }}
        </q-banner>
        <q-banner rounded v-else-if="step === 3" class="bg-grey-2 text-grey-14 q-px-lg q-ma-md">
          {{ $t('aboutPlatform.bannerTexts.banner1') }}
        </q-banner>
        <!-- <q-banner rounded v-else class="bg-grey-2 text-grey-14 q-px-lg q-ma-md">
          The final step is creating the ad...
        </q-banner> -->
      </template>
    </q-stepper>

  </div>
</template>
