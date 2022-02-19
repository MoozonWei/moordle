import {defineStore} from 'pinia'
import {useStorage} from '@vueuse/core'

export const useStore = defineStore('main', {
    state: () => {
        return {
            message: '',
            localStorageDate: useStorage('date', ''),
            pages: {
                showHelp: false,
                showStatistics: false,
                showSetting: false
            },
            statistics: useStorage('statistics', {
                played: 0,
                win: 0,
                currentStreak: 0,
                maxStreak: 0,
                guessDistribution: [0, 0, 0, 0, 0, 0]
            }),
            // game state
            // p - in progress
            // w - win
            // l - lost
            gameState: useStorage('game-state', 'p'),
            boardCurRow: useStorage('board-cur-row', 0),
            boardCurCol: useStorage('board-cur-col', 0),
            boardLetters: useStorage('board-letters', [
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', '']
            ]),
            boardColors: useStorage('board-colors', [
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
        async showMessage(msg, time = 2000) {
            this.message = msg
            await new Promise(resolve => setTimeout(resolve, time))
            this.message = ''
        }
    }
})
