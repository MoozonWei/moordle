<template>
  <div class="keyboard-wrapper" @click="handleKeyClick">
    <div class="row">
      <button
        :data-key-letter="keyboardLayout[0][i-1]"
        class="single-key"
        :class="whatColorIsThisKey(keyboardLayout[0][i-1])"
        v-for="i in 10"
        :key="keyboardLayout[0][i]"
      >{{ keyboardLayout[0][i - 1] }}
      </button>
    </div>
    <div class="row">
      <div style="width: 5%"></div>
      <button
        :data-key-letter="keyboardLayout[1][i-1]"
        class="single-key"
        :class="whatColorIsThisKey(keyboardLayout[1][i-1])"
        v-for="i in 9"
        :key="keyboardLayout[1][i-1]"
      >{{ keyboardLayout[1][i - 1] }}
      </button>
      <div style="width:5%"></div>
    </div>
    <div class="row">
      <button
        data-key-letter="ENTER"
        class="single-key iconfont"
        style="width: 15%"
      >
        &#xe600;
      </button>
      <button
        :data-key-letter="keyboardLayout[2][i-1]"
        class="single-key"
        :class="whatColorIsThisKey(keyboardLayout[2][i-1])"
        v-for="i in 7"
        :key="keyboardLayout[2][i-1]"
      >{{ keyboardLayout[2][i - 1] }}
      </button>
      <button
        data-key-letter="BACKSPACE"
        class="single-key iconfont"
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

// eslint-disable-next-line
const emit = defineEmits(['onUserInput'])

const keyboardLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

const handleKeyClick = (e) => {
  e.preventDefault()
  e.stopPropagation()
  if (e.target.dataset.keyLetter)
    emit('onUserInput', e.target.dataset.keyLetter)
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
  transition: all .5s ease-out;

  &:active {
    background-color: gray;
  }
}
</style>
