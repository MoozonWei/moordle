<script setup>
import Message from './components/Message.vue'
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

// message
const duration = 1000

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
        const solutionArr = solution.split('')
        // mark correct letters
        for (let i = 0; i < 5; i++) {
          if (currentGuess.charAt(i) === solutionArr[i]) {
            tempState[i] = 's'
            solutionArr[i] = ''
          }
        }
        // mark hint
        for (let i = 0; i < 5; i++) {
          if (tempState[i] === '' && solutionArr.includes(currentGuess.charAt(i))) {
            tempState[i] = 'h'
            solutionArr[solutionArr.indexOf(currentGuess.charAt(i))] = ''
          }
        }
        // mark failed
        for(let i = 0; i < 5; i++) {
          if (tempState[i] === '') tempState[i] = 'f'
        }
        // change boardColors
        for (let i = 0; i < 5; i++) {
          store.boardColors[store.boardCurRow][i] = tempState[i]
          await new Promise(resolve => setTimeout(resolve, 500))
        }
        store.boardCurRow++
        store.boardCurCol = 0
        if (tempState.join('') === 'sssss') {
          await store.showMessage('👏 Congrats! 🍾', duration)
          store.gameState = 'w'
          store.statistics.played++
          store.statistics.win++
          store.statistics.guessDistribution[store.boardCurRow - 1]++
          store.statistics.currentStreak++
          store.statistics.maxStreak = Math.max(store.statistics.currentStreak, store.statistics.maxStreak)
          store.pages.showStatistics = true
        } else if (store.boardCurRow >= 6) {
          await store.showMessage('😢 Try again tmrw... 😿', duration)
          await store.showMessage(solution.toUpperCase(), 2000)
          store.gameState = 'l'
          store.statistics.played++
          store.statistics.currentStreak = 0
          store.pages.showStatistics = true
        }
      } else {
        await store.showMessage('Not in word list', duration)
      }
    } else {
      await store.showMessage('Not enough letters', duration)
    }
  } else if (/^[a-zA-Z]$/.test(inputLetter) && store.boardCurCol < 5) {
    store.boardLetters[store.boardCurRow][store.boardCurCol] = inputLetter
    store.boardCurCol++
  }
}

const resetLocalStorage = () => {
  if (store.localStorageDate === '') {
    store.localStorageDate = dayjs().format('YYYY-MM-DD')
    if (store.statistics.played === 0) {
      store.pages.showHelp = true
    }
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
  // reset local storage
  resetLocalStorage()

  if (store.gameState !== 'p') {
    store.pages.showStatistics = true
  }
})
</script>

<template>
  <Message v-if="store.message">{{ store.message }}</Message>
  <div class="solution" v-if="store.gameState === 'l'">{{ solution.toUpperCase() }}</div>
  <div class="app-wrapper">
    <Help/>
    <Statistics/>
    <NavigatorBar/>
    <MatrixBoard/>
    <Keyboard @onUserInput="handleUserInput"/>
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

.solution {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  color: black;
  font-weight: bold;
  padding: 1em;
  border-radius: .3em;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
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
