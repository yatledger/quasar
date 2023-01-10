<script setup>
import signin from 'components/SignIn.vue'
import { ref } from 'vue'
import { userStore } from 'stores/user'

const user = userStore()
const enter = ref(true)
</script>

<template>
  <q-dialog style="opacity: 0.75" v-if="user.crypt && user.sk.length === 0" v-model="enter">
    <signin />
  </q-dialog>
  <!--https://tympanus.net/codrops/2012/01/02/fullscreen-background-image-slideshow-with-css3/-->
  <ul class="cb-slideshow">
    <li><span>Image 01</span>
      <div>
        <h3>открытость</h3>
        <p>&copy; <a
            href="https://unsplash.com/@chuttersnap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">ChutterSnap</a>
        </p>
      </div>
    </li>
    <li><span>Image 02</span>
      <div>
        <h3>неизменяемость</h3>
        <p>&copy; <a
            href="https://unsplash.com/@theshubhamdhage?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Shubham
            Dhage</a></p>
      </div>
    </li>
    <li><span>Image 03</span>
      <div>
        <h3>доказуемость</h3>
        <p>&copy; <a
            href="https://unsplash.com/ja/@clintadair?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Clint
            Adair</a></p>
      </div>
    </li>
    <li><span>Image 04</span>
      <div>
        <h3>безопасность</h3>
        <p>&copy; <a
            href="https://unsplash.com/@urielsc26?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Uriel
            SC</a></p>
      </div>
    </li>
    <li><span>Image 05</span>
      <div>
        <h3>надёжность</h3>
        <p>&copy; <a
            href="https://unsplash.com/@fabioha?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">fabio</a>
        </p>
      </div>
    </li>
  </ul>
  <q-page class="flex flex-center">
    <img :alt="$t('title')" src="/logo.svg" class="logo">
  </q-page>
</template>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Sofia+Sans&display=swap');

.logo {
  opacity: 0.75;
}

@media (orientation: landscape) {
  .logo {
    height: 50vh;
  }
}

@media (orientation: portrait) {
  .logo {
    width: 75vw;
  }
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.cb-slideshow,
.cb-slideshow:after {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 0;
}

.cb-slideshow:after {
  content: '';
  background: transparent url(/slide/pattern.png) repeat top left;
}

.cb-slideshow li span {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  color: transparent;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: none;
  opacity: 0;
  z-index: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-animation: imageAnimation 36s linear infinite 0s;
  -moz-animation: imageAnimation 36s linear infinite 0s;
  -o-animation: imageAnimation 36s linear infinite 0s;
  -ms-animation: imageAnimation 36s linear infinite 0s;
  animation: imageAnimation 36s linear infinite 0s;
}

.cb-slideshow li div {
  z-index: 1000;
  position: absolute;
  bottom: 100px;
  left: 0px;
  width: 100%;
  text-align: right;
  opacity: 0;
  -webkit-animation: titleAnimation 36s linear infinite 0s;
  -moz-animation: titleAnimation 36s linear infinite 0s;
  -o-animation: titleAnimation 36s linear infinite 0s;
  -ms-animation: titleAnimation 36s linear infinite 0s;
  animation: titleAnimation 36s linear infinite 0s;
}

.cb-slideshow li div h3 {
  font-family: 'Sofia Sans', 'Arial Narrow', Arial, sans-serif;
  font-size: 100px;
  padding: 0 30px;
  line-height: 50px;
  margin: 25px 0;
  color: #FFF;
}

.cb-slideshow li div p {
  font-size: 15px;
  padding: 0 30px;
  color: #FFF;
  font-style: italic;
}

.cb-slideshow li div p a {
  color: #FFF;
}

.cb-slideshow li:nth-child(1) span {
  background-image: url(/slide/01.webp)
}

.cb-slideshow li:nth-child(2) span {
  background-image: url(/slide/02.webp);
  -webkit-animation-delay: 6s;
  -moz-animation-delay: 6s;
  -o-animation-delay: 6s;
  -ms-animation-delay: 6s;
  animation-delay: 6s;
}

.cb-slideshow li:nth-child(3) span {
  background-image: url(/slide/03.webp);
  -webkit-animation-delay: 12s;
  -moz-animation-delay: 12s;
  -o-animation-delay: 12s;
  -ms-animation-delay: 12s;
  animation-delay: 12s;
}

.cb-slideshow li:nth-child(4) span {
  background-image: url(/slide/04.webp);
  -webkit-animation-delay: 18s;
  -moz-animation-delay: 18s;
  -o-animation-delay: 18s;
  -ms-animation-delay: 18s;
  animation-delay: 18s;
}

.cb-slideshow li:nth-child(5) span {
  background-image: url(/slide/05.webp);
  -webkit-animation-delay: 24s;
  -moz-animation-delay: 24s;
  -o-animation-delay: 24s;
  -ms-animation-delay: 24s;
  animation-delay: 24s;
}

.cb-slideshow li:nth-child(2) div {
  -webkit-animation-delay: 6s;
  -moz-animation-delay: 6s;
  -o-animation-delay: 6s;
  -ms-animation-delay: 6s;
  animation-delay: 6s;
}

.cb-slideshow li:nth-child(3) div {
  -webkit-animation-delay: 12s;
  -moz-animation-delay: 12s;
  -o-animation-delay: 12s;
  -ms-animation-delay: 12s;
  animation-delay: 12s;
}

.cb-slideshow li:nth-child(4) div {
  -webkit-animation-delay: 18s;
  -moz-animation-delay: 18s;
  -o-animation-delay: 18s;
  -ms-animation-delay: 18s;
  animation-delay: 18s;
}

.cb-slideshow li:nth-child(5) div {
  -webkit-animation-delay: 24s;
  -moz-animation-delay: 24s;
  -o-animation-delay: 24s;
  -ms-animation-delay: 24s;
  animation-delay: 24s;
}

/* Animation for the slideshow images */
@-webkit-keyframes imageAnimation {
  0% {
    opacity: 0;
    -webkit-animation-timing-function: ease-in;
  }

  8% {
    opacity: 1;
    -webkit-transform: scale(1.05);
    -webkit-animation-timing-function: ease-out;
  }

  17% {
    opacity: 1;
    -webkit-transform: scale(1.1) rotate(3deg);
  }

  25% {
    opacity: 0;
    -webkit-transform: scale(1.1) rotate(3deg);
  }

  100% {
    opacity: 0
  }
}

@-moz-keyframes imageAnimation {
  0% {
    opacity: 0;
    -moz-animation-timing-function: ease-in;
  }

  8% {
    opacity: 1;
    -moz-transform: scale(1.05);
    -moz-animation-timing-function: ease-out;
  }

  17% {
    opacity: 1;
    -moz-transform: scale(1.1) rotate(3deg);
  }

  25% {
    opacity: 0;
    -moz-transform: scale(1.1) rotate(3deg);
  }

  100% {
    opacity: 0
  }
}

@-o-keyframes imageAnimation {
  0% {
    opacity: 0;
    -o-animation-timing-function: ease-in;
  }

  8% {
    opacity: 1;
    -o-transform: scale(1.05);
    -o-animation-timing-function: ease-out;
  }

  17% {
    opacity: 1;
    -o-transform: scale(1.1) rotate(3deg);
  }

  25% {
    opacity: 0;
    -o-transform: scale(1.1) rotate(3deg);
  }

  100% {
    opacity: 0
  }
}

@-ms-keyframes imageAnimation {
  0% {
    opacity: 0;
    -ms-animation-timing-function: ease-in;
  }

  8% {
    opacity: 1;
    -ms-transform: scale(1.05);
    -ms-animation-timing-function: ease-out;
  }

  17% {
    opacity: 1;
    -ms-transform: scale(1.1) rotate(3deg);
  }

  25% {
    opacity: 0;
    -ms-transform: scale(1.1) rotate(3deg);
  }

  100% {
    opacity: 0
  }
}

@keyframes imageAnimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }

  8% {
    opacity: 1;
    transform: scale(1.05);
    animation-timing-function: ease-out;
  }

  17% {
    opacity: 1;
    transform: scale(1.1) rotate(3deg);
  }

  25% {
    opacity: 0;
    transform: scale(1.1) rotate(3deg);
  }

  100% {
    opacity: 0
  }
}

@-webkit-keyframes titleAnimation {
  0% {
    opacity: 0;
    -webkit-transform: translateX(200px);
  }

  8% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }

  17% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }

  19% {
    opacity: 0;
    -webkit-transform: translateX(-400px);
  }

  25% {
    opacity: 0
  }

  100% {
    opacity: 0
  }
}

@-moz-keyframes titleAnimation {
  0% {
    opacity: 0;
    -moz-transform: translateX(200px);
  }

  8% {
    opacity: 1;
    -moz-transform: translateX(0px);
  }

  17% {
    opacity: 1;
    -moz-transform: translateX(0px);
  }

  19% {
    opacity: 0;
    -moz-transform: translateX(-400px);
  }

  25% {
    opacity: 0
  }

  100% {
    opacity: 0
  }
}

@-o-keyframes titleAnimation {
  0% {
    opacity: 0;
    -o-transform: translateX(200px);
  }

  8% {
    opacity: 1;
    -o-transform: translateX(0px);
  }

  17% {
    opacity: 1;
    -o-transform: translateX(0px);
  }

  19% {
    opacity: 0;
    -o-transform: translateX(-400px);
  }

  25% {
    opacity: 0
  }

  100% {
    opacity: 0
  }
}

@-ms-keyframes titleAnimation {
  0% {
    opacity: 0;
    -ms-transform: translateX(200px);
  }

  8% {
    opacity: 1;
    -ms-transform: translateX(0px);
  }

  17% {
    opacity: 1;
    -ms-transform: translateX(0px);
  }

  19% {
    opacity: 0;
    -ms-transform: translateX(-400px);
  }

  25% {
    opacity: 0
  }

  100% {
    opacity: 0
  }
}

@keyframes titleAnimation {
  0% {
    opacity: 0;
    transform: translateX(200px);
  }

  8% {
    opacity: 1;
    transform: translateX(0px);
  }

  17% {
    opacity: 1;
    transform: translateX(0px);
  }

  19% {
    opacity: 0;
    transform: translateX(-400px);
  }

  25% {
    opacity: 0
  }

  100% {
    opacity: 0
  }
}

/* Show at least something when animations not supported */
.no-cssanimations .cb-slideshow li span {
  opacity: 1;
}

@media screen and (max-width: 1140px) {
  .cb-slideshow li div h3 {
    font-size: 100px
  }
}

@media screen and (max-width: 600px) {
  .cb-slideshow li div h3 {
    font-size: 40px
  }
}
</style>
