<template>
  <div class="block">
    <img
      class="image"
      src="../assets/img/mobile.svg"
      alt="mouse"
    >
    <span class="info">
      Sorry, this app doesn't work on smartphones
    </span>
  </div>
</template>

<style lang="scss" scoped>
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100svh;
  padding: 10vh 10vw;
  gap: 3vh;

  .image {
    width: 100%;
  }

  .info {
    display: inline-flex;
    font-size: 3em;
    font-family: "Ubuntu", sans-serif;
    color: var(--main);
    text-align: center;
  }
}
</style>