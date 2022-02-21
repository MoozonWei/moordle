import {defineStore} from 'pinia'
import {useStorage} from '@vueuse/core'

export const useStore = defineStore('main', {
    state: () => {
        return {
            message: '',
            localStorageDate: useStorage('moordle-date', ''),
            pages: {
                showHelp: false,
                showStatistics: false,
                showSetting: false
            },
            statistics: useStorage('moordle-statistics', {
                played: 0,
                win: 0,
                currentStreak: 0,
                maxStreak: 0,
                guessDistribution: [0, 0, 0, 0, 0, 0]
            }),
            // game state
            // p - in progress
            // w - win
            // l - lose
            gameState: useStorage('moordle-game-state', 'p'),
            boardCurRow: useStorage('moordle-board-cur-row', 0),
            boardCurCol: useStorage('moordle-board-cur-col', 0),
            boardLetters: useStorage('moordle-board-letters', [
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', '']
            ]),
            boardColors: useStorage('moordle-board-colors', [
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', '']
            ])
        }
    },
    actions: {
        async showMessage(msg, time) {
            if (time) {
                this.message = msg
                await new Promise(resolve => setTimeout(resolve, time))
                this.message = ''
            } else {
                this.message = msg
            }
        }
    }
})
