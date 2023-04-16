<template>
  <new-popup-layout title="About">
    <template #body>
      <section class="section">
        <h4 class="header">
          Version 0.1.5
        </h4>
        <ol class="list">
          <li class="item">
            Item images added;
          </li>
          <li class="item">
            Warband added;
          </li>
          <li class="item">
            Bugs fixed.
          </li>
        </ol>
      </section>
      <section class="section">
        <h4 class="header">
          Version 0.1.4
        </h4>
        <ol class="list">
          <li class="item">
            Notifications added;
          </li>
          <li class="item">
            Portraits upload added;
          </li>
          <li class="item">
            Some visual bugs fixed.
          </li>
        </ol>
      </section>
      <section class="section">
        <h4 class="header">
          Version 0.1.3
        </h4>
        <ol class="list">
          <li class="item">
            Option to create custom items added;
          </li>
          <li class="item">
            Keyboard control in popups added;
          </li>
          <li class="item">
            Some visual bugs fixed.
          </li>
        </ol>
      </section>
      <section class="section">
        <h4 class="header">
          Version 0.1.2
        </h4>
        <ol class="list">
          <li class="item">
            Bug with opportunity to drag'n'drop illegal items fixed;
          </li>
          <li class="item">
            Images for all simple weapons added.
          </li>
        </ol>
      </section>
      <section class="section">
        <h4 class="header">
          Version 0.1.1
        </h4>
        <ol class="list">
          <li class="item">
            This is the first version of app, and it does not contain images 
            (including character portraits), information/error messages and pdf download 
            option (but you can use the browser's "print page" function);
          </li>
          <li class="item">
            Currently, you can create a new mouse, manipulate with items and hirelings, 
            level up, and save/load character as .json file;
          </li>
        </ol>
      </section>
    </template>
    <template #footer>
      <section class="info">
        If you notice any bug or have an idea to update the app,<br> please contact me: 
        <a
          class="link"
          href="https://brightsdays.github.io/contacts"
          target="_blank"
        >brightsdays</a>.
      </section>
    </template>
  </new-popup-layout>
</template>

<script setup lang="ts">
import NewPopupLayout from './PopupLayout.vue'
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  margin: 20px auto 0;
  flex-direction: column;
  gap: 10px;
  &:first-child {
    margin-top: 0;
  }

  .header {
    text-align: left;
    font-family: "Pirata One", sans-serif;
    font-size: 2.6em;
    font-weight: normal;
    color: var(--main);
  }

  .list {
    width: 600px;
    max-width: 100%;
    padding: 0 0 0 20px;
    text-align: left;

    .item {
      color: var(--main);
      font-family: "Ubuntu", sans-serif;
      font-size: 1.6em;
      margin-bottom: 10px;
    }
  }
}
.info {
  width: 100%;
  text-align: center;
  color: var(--main);
  font-family: "Ubuntu", sans-serif;
  font-size: 1.6em;

  .link {
    font-size: 1em;
    color: var(--second);

    &:hover {
      color: var(--main);
      text-decoration: none;
    }
  }
}
</style>