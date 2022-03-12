<template>
  <div
    class="statistics-wrapper"
    @click.self="store.pages.showStatistics = !store.pages.showStatistics"
    v-if="store.pages.showStatistics"
  >
    <div class="statistics-box">
      <div class="title">STATISTICS</div>
      <div class="statistics">
        <div class="statistics-played">
          <span>{{ store.statistics.played }}</span>
          <span>Played</span>
        </div>
        <div class="statistics-win">
          <span>{{
              store.statistics.played === 0 ? 0 : (store.statistics.win * 100 / store.statistics.played).toFixed(0)
            }}%</span>
          <span>Win%</span>
        </div>
        <div class="statistics-current-streak">
          <span>{{ store.statistics.currentStreak }}</span>
          <span>Current Streak</span>
        </div>
        <div class="statistics-max-streak">
          <span>{{ store.statistics.maxStreak }}</span>
          <span>Max Streak</span>
        </div>
      </div>
      <div class="title">GUESS DISTRIBUTION</div>
      <div class="guess-distribution">
        <div
          v-for="i in 6"
          :key="i"
        >
          <span class="guess-num">{{ i }}</span>
          <div class="guess-bar-wrapper">
            <div
              class="guess-bar"
              :class="{
                'bgc-green': store.gameState === 'w' && i === store.boardCurRow
              }"
              :style="`width: ${store.statistics.guessDistribution[i - 1] === 0 ? 'auto' : (store.statistics.guessDistribution[i - 1] * 100 / Math.max(...store.statistics.guessDistribution) + '%')}`"
            >
              {{ store.statistics.guessDistribution[i - 1] }}
            </div>
          </div>
        </div>
      </div>
      <div class="share" v-if="store.gameState !== 'p'">
        <div class="next-game">
          <span>NEXT MOORDLE</span>
          <span class="next-game-time">{{ remainTime }}</span>
        </div>
        <div class="divide-line"></div>
        <button class="share-button" @click="start()">SHARE</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '../store'
import {ref, computed} from 'vue'
import dayjs from 'dayjs'
import {useClipboard, useShare} from '@vueuse/core'

const store = useStore()

const endOfDayArr = ['23', '59', '59']
const remainTime = ref('##:##:##')

setInterval(() => {
  const nowArr = dayjs().format('HH:mm:ss').split(':')
  let [h, m, s] = [endOfDayArr[0] - nowArr[0], endOfDayArr[1] - nowArr[1], endOfDayArr[2] - nowArr[2]]
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  remainTime.value = `${h}:${m}:${s}`
  if (store.localStorageDate !== dayjs().format('YYYY-MM-DD')) window.location.reload()
}, 1000)

const text = computed(() => `Moordle\n${
  store.boardColors.map(row => {
    return row.map(color => {
      switch (color) {
        case 's':
          return '🟩'
        case 'h':
          return '🟨'
        case 'f':
          return '⬛️'
        case '':
          return '⬜️'
      }
    }).join('')
  }).join('\n')
}\n[${store.gameState === 'w' ? (store.boardCurRow  + '/6') : '-_-'}]·${dayjs().format('YYYY-MM-DD')}\nhttps://moordle.moozon.site/`)

const share = useShare(computed(() => ({
  title: 'Moordle',
  text: text.value
})))

const clipboard = useClipboard()

async function start() {
  if (share.isSupported) {
    await share.share()
    await store.showMessage('Shared', 1000)
  } else if (clipboard.isSupported) {
    await clipboard.copy(text.value)
    await store.showMessage('Copied', 1000)
  } else {
    await store.showMessage(text.value.split('\n').slice(0, 8).join('\n'))
  }
}
</script>

<script>
export default {
  name: 'Statistics.vue'
}
</script>

<style lang='scss' scoped>
.statistics-wrapper {
  position: fixed;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, .5);
  width: 100%;
  height: 100%;

  .statistics-box {
    max-width: 500px;
    width: 90%;
    border-radius: .1rem;
    box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
    background-color: #fff;
    padding: .3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;

    .title {
      font-weight: bold;
      font-size: .20rem;
      margin-bottom: .1rem;
    }

    .statistics {
      display: flex;
      justify-content: space-between;
      margin-bottom: .2rem;

      & > div {
        width: .6rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: .14rem;

        & > span:first-child {
          font-weight: bold;
          font-size: .2rem;
        }
      }
    }

    .guess-distribution {
      width: 2.8rem;
      display: flex;
      flex-direction: column;

      & > div {
        display: flex;
        align-items: center;
        padding: .03rem 0;

        .guess-num {
          width: 1em;
          text-align: center;
          margin-right: .2em;
          color: black;
          font-weight: 500;
        }

        .guess-bar-wrapper {
          flex: 1;

          .guess-bar {
            color: white;
            background-color: var(--gray);
            padding: .01rem .04rem;
            border-radius: .04rem;
            display: inline-block;
            width: auto;
            text-align: right;
          }
        }
      }
    }

    .share {
      width: 300px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      font-weight: bold;
      text-align: center;
      margin-top: .2rem;

      .next-game {
        display: flex;
        flex-direction: column;
        align-items: center;

        .next-game-time {
          width: 1.3rem;
          font-size: 2em;
          font-weight: 300;
          margin-top: .05rem;
        }
      }

      .divide-line {
        border-right: 1px solid black;
        height: 4em;
        margin: 0 1.5em;
      }

      .share-button {
        flex-grow: 1;
        font-size: 1.25em;
        color: white;
        background-color: var(--green);
        padding: .5em 0;
        border-radius: .2em;
        cursor: pointer;

        &:active {
          background-color: var(--darkendGreen);
        }
      }
    }
  }
}
</style>
