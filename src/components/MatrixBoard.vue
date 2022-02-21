<template>
  <div class="matrix-board-wrapper">
    <div class="letters">
      <div
        v-for="i in 30"
        :key="i"
        class="letter-box"
        :class="{
          'bgc-lightGray': store.boardColors[Math.floor((i-1)/5)][(i-1)%5] === '',
          'border-gray': store.boardLetters[Math.floor((i-1)/5)][(i-1)%5] !== '',
          'border-none font-white bgc-green': store.boardColors[Math.floor((i-1)/5)][(i-1)%5] === 's',
          'border-none font-white bgc-yellow': store.boardColors[Math.floor((i-1)/5)][(i-1)%5] === 'h',
          'border-none font-white bgc-darkGray': store.boardColors[Math.floor((i-1)/5)][(i-1)%5] === 'f',
        }"
      >
        {{ store.boardLetters[Math.floor((i-1)/5)][(i-1)%5] }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from 'vue'
import {useStore} from '../store/index'

const store = useStore()

onMounted(() => {
  const letterBoxArray = Array.prototype.slice.call(document.getElementsByClassName('letter-box'))

  letterBoxArray.forEach(e => {
    const style = document.defaultView.getComputedStyle(e, '')
    e.style.width = style.height
    e.style.fontSize = `${parseInt(style.height) * 0.5}px`
  })

  window.onresize = () => {
    letterBoxArray.forEach(e => {
      const style = document.defaultView.getComputedStyle(e, '')
      e.style.width = style.height
      e.style.fontSize = `${parseInt(style.height) * 0.5}px`
    })

    const keyArray = Array.prototype.slice.call(document.getElementsByClassName('single-key'))

    keyArray.forEach(e => {
      const style = document.defaultView.getComputedStyle(e, '')
      e.style.fontSize = `${parseInt(style.height) * 0.25}px`
    })
  }
})
</script>

<script>
export default {
  name: 'MatrixBoard'
}
</script>

<style lang='scss' scoped>
.matrix-board-wrapper {
  width: 100%;
  flex: 2;
  padding: .2rem 0;
  display: flex;
  justify-content: center;
  align-items: stretch;

  .letters {
    //padding: .04rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: .04rem;
    max-height: calc(110vw);

    .letter-box {
      border-radius: 10%;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
    }
  }
}

.border-gray {
  border: .3vh solid var(--gray);
}

.border-none {
  border: none;
}
</style>
