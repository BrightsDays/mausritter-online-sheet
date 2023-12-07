<template>
  <PopupLayout
    title="About"
    buttons="0"
  >
    <template #body>
      <section class="info">
        Mausritter is a sword-and-whiskers role-playing game by 
        <a
          class="link"
          href="https://losing.games/"
          target="_blank"
        >Losing Games</a> - fast, simple, and perfect for new players. 
        Players take on the roles of brave mice, finding adventures in a 
        world where danger lurks in every corner.
      </section>
      <section class="info">
        This web application will assist you in building and using your character 
        in the game, especially if you play online. You can use items, store them 
        in the bank, add hirelings, and form warbands. Additionally, you can export 
        your character info as a .json file for use on other devices.
      </section>
      <section class="info">
        Currently, it's like a demo version; in the near future, I will add all item 
        images and complete testing. However, you can already use it for your games!
      </section>
      <section class="info">
        If you notice any bugs or have ideas to update the app, please contact me.
      </section>
      <section class="info centered">
        Game created by <a
          class="link"
          href="https://losing.games/"
          target="_blank"
        >Isaac Williams</a><br>
        Official game page: <a
          class="link"
          href="https://mausritter.com"
          target="_blank"
        >mausritter.com</a><br>
        Read the instructions on <a
          class="link"
          href="https://github.com/BrightsDays/mausritter-online-sheet"
          target="_blank"
        >GitHub</a><br>
        Application by <a
          class="link"
          href="https://brightsdays.github.io/"
          target="_blank"
        >brightsdays</a>
      </section>
    </template>
  </PopupLayout>
</template>

<script setup lang="ts">
import PopupLayout from './PopupLayout.vue'
</script>

<style lang="scss" scoped>
.info {
  width: 600px;
  max-width: 100%;
  color: var(--main);
  font-family: "Ubuntu", sans-serif;
  font-size: 1.6rem;
  line-height: 2rem;
  &.centered {
    padding-top: 10px;
    text-align: center;
    border-top: 1px solid var(--second);
  }

  .link {
    font-size: 1em;
    color: var(--second);
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>