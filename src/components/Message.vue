<template>
  <div class="message-wrapper">
    <div class="message-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message'
}
</script>

<style lang='scss' scoped>
.message-wrapper {
  width: 100%;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  display: flex;
  justify-content: center;

  .message-box {
    background-color: black;
    color: white;
    font-size: 1em;
    padding: .3em .4em;
    border-radius: .3em;
    white-space: pre-line;
  }
}
</style>
