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
        class="single-key"
        @click="handleKeyClick"
        style="width: 15%"
      >
        ENTER
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
        class="single-key"
        @click="handleKeyClick"
        style="width: 15%"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path fill="var(--color-tone-1)"
                d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
        </svg>
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
  emit('onUserInput', targetElement.innerText || 'BACKSPACE')
  // targetElement.style.backgroundColor = 'gray'
  // setTimeout(() => {
  //   targetElement.style.backgroundColor = ''
  // }, 1)
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
})

</script>

<script>
export default {
  name: 'Keyboard'
}
</script>

<style lang='scss' scoped>
.keyboard-wrapper {
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
