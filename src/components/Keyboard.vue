<template>
  <div class="keyboard-wrapper">
    <div class="row">
      <button
        :id="'key-' + keyboardLayout[0][i-1]"
        class="single-key"
        :class="whatColorIsThisKey(keyboardLayout[0][i-1])"
        v-for="i in 10"
        :key="keyboardLayout[0][i]"
        @click="handleKeyClick"
      >{{ keyboardLayout[0][i - 1] }}
      </button>
    </div>
    <div class="row">
      <div style="width: 5%"></div>
      <button
        :id="'key-' + keyboardLayout[1][i-1]"
        class="single-key"
        :class="whatColorIsThisKey(keyboardLayout[1][i-1])"
        v-for="i in 9"
        :key="keyboardLayout[1][i-1]"
        @click="handleKeyClick"
      >{{ keyboardLayout[1][i - 1] }}
      </button>
      <div style="width:5%"></div>
    </div>
    <div class="row">
      <button
        id="key-ENTER"
        class="single-key iconfont"
        @click="handleKeyClick"
        style="width: 15%"
      >
        &#xe600;
      </button>
      <button
        :id="'key-' + keyboardLayout[2][i-1]"
        class="single-key"
        :class="whatColorIsThisKey(keyboardLayout[2][i-1])"
        v-for="i in 7"
        :key="keyboardLayout[2][i-1]"
        @click="handleKeyClick"
      >{{ keyboardLayout[2][i - 1] }}
      </button>
      <button
        id="key-BACKSPACE"
        class="single-key iconfont"
        @click="handleKeyClick"
        style="width: 15%"
      >
        &#xef30;
      </button>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from 'vue'
import {useStore} from '../store'

const store = useStore()

const emit = defineEmits(['onUserInput'])

const keyboardLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

const handleKeyClick = (e) => {
  e.preventDefault()
  const targetElement = e.target
  const innerText = targetElement.innerText
  let emitPayload = innerText
  if (targetElement.id === 'key-ENTER') {
    emitPayload = 'ENTER'
  } else if (targetElement.id === 'key-BACKSPACE') {
    emitPayload = 'BACKSPACE'
  }
  emit('onUserInput', emitPayload)
}

const whatColorIsThisKey = (keyStr) => {
  let answer = ''
  let isYellow = false
  let isGray = false
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      if (keyStr === store.boardLetters[i][j].toUpperCase() && store.boardColors[i][j] === 's') return answer = 'font-white bgc-green'
      if (keyStr === store.boardLetters[i][j].toUpperCase() && store.boardColors[i][j] === 'h') isYellow = true
      if (keyStr === store.boardLetters[i][j].toUpperCase() && store.boardColors[i][j] === 'f') isGray = true
    }
  }
  answer = isYellow ? 'font-white bgc-yellow' : isGray ? 'font-white bgc-gray' : ''
  return answer
}
onMounted(() => {
  window.onkeyup = (e) => {
    emit('onUserInput', e.key.toUpperCase())
  }


  const keyArray = Array.prototype.slice.call(document.getElementsByClassName('single-key'))

  keyArray.forEach(e => {
    const style = document.defaultView.getComputedStyle(e, '')
    e.style.fontSize = `${parseInt(style.height) * 0.25}px`
  })
})

</script>

<script>
export default {
  name: 'Keyboard'
}
</script>

<style lang='scss' scoped>
@font-face {
  font-family: "iconfont"; /* Project id 3195908 */
  src: url('//at.alicdn.com/t/font_3195908_6me9s284z6m.woff2?t=1645440828122') format('woff2'),
  url('//at.alicdn.com/t/font_3195908_6me9s284z6m.woff?t=1645440828122') format('woff'),
  url('//at.alicdn.com/t/font_3195908_6me9s284z6m.ttf?t=1645440828122') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-Backspace-copy:before {
  content: "\ef30";
}

.icon-backspace1:before {
  content: "\ef2f";
}

.icon-Backspace:before {
  content: "\e61b";
}

.icon-backspace:before {
  content: "\e611";
}

.icon-enter1:before {
  content: "\e600";
}

.keyboard-wrapper {
  flex: 1;
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  padding: .05rem;
}

.row {
  flex-wrap: nowrap;
  flex: 1;
  display: flex;
}

.single-key {
  width: 10%;
  text-align: center;
  line-height: .6rem;
  border-radius: .05rem;
  background-color: #f5f5f5;
  margin: .02rem;
  font-weight: 600;
  font-size: .14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;

  &:active {
    background-color: gray;
  }
}
</style>
