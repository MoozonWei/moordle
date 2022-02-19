<script setup>
import Help from './components/Help.vue'
import Statistics from './components/Statistics.vue'
import Keyboard from './components/Keyboard.vue'
import NavigatorBar from './components/NavigatorBar.vue'
import MatrixBoard from './components/MatrixBoard.vue'
import {useStore} from './store/index'
import {getWordOfTheDay, allWords} from './wordOfTheDay'
import {onMounted} from 'vue'
import dayjs from 'dayjs'

const store = useStore()

// get word of the day
const solution = getWordOfTheDay()

const handleUserInput = async (inputLetter) => {
  if (store.gameState !== 'p') return
  if (inputLetter === 'BACKSPACE') {
    if (store.boardCurCol !== 0) {
      store.boardCurCol--
      store.boardLetters[store.boardCurRow][store.boardCurCol] = ''
    }
  } else if (inputLetter === 'ENTER') {
    if (store.boardCurCol === 5) {
      const currentGuess = store.boardLetters[store.boardCurRow].join('').toLowerCase()
      if (allWords.includes(currentGuess)) {
        const tempState = ['', '', '', '', '']
        const letterPool = []
        for (let i = 0; i < 5; i++) {
          if (currentGuess.charAt(i) === solution.charAt(i)) {
            tempState[i] = 's'
          } else {
            letterPool.push(solution.charAt(i))
          }
        }
        for (let i = 0; i < 5; i++) {
          if (tempState[i] === '') {
            if (letterPool.indexOf(currentGuess.charAt(i)) !== -1) {
              tempState[i] = 'h'
            } else {
              tempState[i] = 'f'
            }
          }
        }
        for (let i = 0; i < 5; i++) {
          store.boardColors[store.boardCurRow][i] = tempState[i]
          await new Promise(resolve => setTimeout(resolve, 500))
        }
        store.boardCurRow++
        store.boardCurCol = 0
        if (letterPool.length === 0) {
          alert('win')
          store.gameState = 'w'
          store.statistics.played++
          store.statistics.win++
          store.statistics.guessDistribution[store.boardCurRow-1]++
          store.statistics.currentStreak++
          store.statistics.maxStreak = Math.max(store.statistics.currentStreak, store.statistics.maxStreak)
          store.pages.showStatistics = true
        } else if (store.boardCurRow >= 6) {
          alert('lose')
          store.gameState = 'l'
          store.statistics.played++
          store.statistics.currentStreak = 0
          store.pages.showStatistics = true
        }
      } else {
        alert('not a word')
      }
    } else {
      alert('not enough letters')
    }
  } else if (/^[a-zA-Z]$/.test(inputLetter) && store.boardCurCol < 5) {
    store.boardLetters[store.boardCurRow][store.boardCurCol] = inputLetter
    store.boardCurCol++
  }
}

const initializeLocalStorage = () => {
  if (store.localStorageDate === '') {
    store.localStorageDate = dayjs().format('YYYY-MM-DD')
  } else if (store.localStorageDate !== dayjs().format('YYYY-MM-DD')) {
    store.gameState = 'p'
    store.boardCurRow = 0
    store.boardCurCol = 0
    store.boardLetters = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]
    store.boardColors = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]
    store.localStorageDate = dayjs().format('YYYY-MM-DD')
  }
}

onMounted(() => {
  // initialize local storage
  initializeLocalStorage()

  if (store.statistics.played === 0) {
    store.pages.showHelp = true
  }
  if (store.gameState !== 'p') {
    store.pages.showStatistics = true
  }
})
</script>

<template>
  <div class="app-wrapper">
    <Help/>
    <Statistics/>
    <NavigatorBar/>
    <MatrixBoard/>
    <Keyboard
      @onUserInput="handleUserInput"
    />
  </div>
</template>

<style lang="scss">
:root {
  font-size: 100px;
  --green: #6aaa64;
  --darkendGreen: #538d4e;
  --yellow: #c9b458;
  --darkendYellow: #b59f3b;
  --lightGray: #f5f5f5;
  --gray: #86888a;
  --darkGray: #939598;
  --white: #fff;
  --black: #212121;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: .16rem;
}

button {
  outline: none;
  border: none;
  color: black;
}

#app {
  height: 100%;
}

.app-wrapper {
  width: 100%;
  max-width: 500px;
  min-width: 375px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.bgc-lightGray {
  background-color: var(--lightGray) !important;
}

.bgc-gray {
  background-color: var(--gray) !important;
}

.bgc-darkGray {
  background-color: var(--darkGray) !important;
}

.bgc-black {
  background-color: var(--black) !important;
}

.bgc-white {
  background-color: var(--white) !important;
}

.bgc-green {
  background-color: var(--green) !important;
}

.bgc-darkendGreen {
  background-color: var(--darkendGreen) !important;
}

.bgc-yellow {
  background-color: var(--yellow) !important;
}

.bgc-darkendYellow {
  background-color: var(--darkendYellow) !important;
}

.font-white {
  color: var(--white) !important;
}

.font-black {
  color: var(--black) !important;
}
</style>
