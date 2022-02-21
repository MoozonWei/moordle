<template>
  <div class="message-wrapper" @click.prevent="store.message = ''">
    <div class="message-box">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '../store'

const store = useStore()
</script>

<script>
export default {
  name: 'Message'
}
</script>

<style lang='scss' scoped>
.message-wrapper {
  width: 100%;
  height: 120%;
  position: fixed;
  top: -20%;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;

  .message-box {
    background-color: black;
    color: white;
    font-size: 1em;
    padding: 1em;
    border-radius: .3em;
    white-space: pre-line;
  }
}
</style>
