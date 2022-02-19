<template>
  <div
    class="help-wrapper"
    @click.self="store.pages.showHelp = !store.pages.showHelp"
    v-if="store.pages.showHelp"
  >
    <div class="help-box">
      <div class="help-title"><strong>HOW TO PLAY</strong></div>
      <div class="help-description">
        <p>Guess the <strong>Moordle</strong> in six tries.</p>
        <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
        <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
      </div>
      <div class="divide-line"></div>
      <div class="help-examples">
        <p class="help-example-title"><strong>EXAMPLES</strong></p>
        <div class="help-example-letter-boxes">
          <div class="example-letter-box bgc-green font-white">W</div>
          <div class="example-letter-box">E</div>
          <div class="example-letter-box">A</div>
          <div class="example-letter-box">R</div>
          <div class="example-letter-box">Y</div>
        </div>
        <p class="help-example-explanation">The letter <strong>W</strong> is in the word and in the correct spot.</p>
        <div class="help-example-letter-boxes">
          <div class="example-letter-box">P</div>
          <div class="example-letter-box bgc-yellow font-white">I</div>
          <div class="example-letter-box">L</div>
          <div class="example-letter-box">L</div>
          <div class="example-letter-box">S</div>
        </div>
        <p class="help-example-explanation">The letter <strong>I</strong> is in the word but in the wrong spot.</p>
        <div class="help-example-letter-boxes">
          <div class="example-letter-box">V</div>
          <div class="example-letter-box">A</div>
          <div class="example-letter-box">G</div>
          <div class="example-letter-box bgc-gray font-white">U</div>
          <div class="example-letter-box">E</div>
        </div>
        <p class="help-example-explanation">The letter <strong>U</strong> is not in the word in any spot.</p>
      </div>
      <div class="divide-line"></div>
      <p><strong>A new Moordle will be available each day!</strong></p>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '../store'

const store = useStore()
</script>

<script>
export default {
  name: 'Help'
}
</script>

<style lang='scss' scoped>
.help-wrapper {
  position: fixed;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, .5);
  width: 100%;
  height: 100%;

  .help-box {
    max-width: 500px;
    width: 90%;
    max-height: 70%;
    border-radius: .1rem;
    box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
    background-color: #fff;
    padding: .3rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: stretch;
    overflow: scroll;

    p {
      text-align: justify;
    }

    .help-title {
      align-self: center;
      font-weight: bold;
      font-size: .20rem;
      margin-bottom: .1rem;
    }

    .divide-line {
      border-top: 1px solid #d3d6da;
      align-self: stretch;
    }

    .help-examples {
      .help-example-letter-boxes {
        display: flex;
        flex-direction: row;

        .example-letter-box {
          font-size: 2.0em;
          font-weight: bold;
          border-radius: 10%;
          background-color: var(--lightGray);
          width: 1.5em;
          height: 1.5em;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: .1em;
        }
      }
    }
  }
}
</style>
