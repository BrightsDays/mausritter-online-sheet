<template>
  <div class="block">
    <span class="info">
      Sorry, this app doesn't work on smartphones
    </span>
  </div>
</template>

<style lang="scss" scoped>
.block {
  display: flex;
  width: 100vw;
  height: 100svh;
  padding: 10vh 10vw;

  .info {
    display: inline-flex;
    font-size: 3em;
    font-family: "Ubuntu", sans-serif;
    color: var(--main);
    text-align: center;
  }
}
</style>