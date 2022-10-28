<template>
  <popup-layout>
    <h3 class="popup__header">
      About
    </h3>
    <section class="popup__form">
      <div class="popup__section">
        <h4 class="popup__header popup__header--small">
          Version 0.1.3
        </h4>
      </div>
      <div class="popup__section">
        <ol class="popup__list">
          <li class="popup__item">
            Option to create custom items added;
          </li>
          <li class="popup__item">
            Keyboard control in popups added;
          </li>
          <li class="popup__item">
            Some visual bugs fixed.
          </li>
        </ol>
      </div>
    </section>
    <section class="popup__form">
      <div class="popup__section">
        <h4 class="popup__header popup__header--small">
          Version 0.1.2
        </h4>
      </div>
      <div class="popup__section">
        <ol class="popup__list">
          <li class="popup__item">
            Bug with opportunity to drag'n'drop illegal items fixed;
          </li>
          <li class="popup__item">
            Images for all simple weapons added.
          </li>
        </ol>
      </div>
    </section>
    <section class="popup__form">
      <div class="popup__section">
        <h4 class="popup__header popup__header--small">
          Version 0.1.1
        </h4>
      </div>
      <div class="popup__section">
        <ol class="popup__list">
          <li class="popup__item">
            This is the first version of app, and it does not contain images 
            (including character portraits), information/error messages and pdf download 
            option (but you can use the browser's "print page" function);
          </li>
          <li class="popup__item">
            Currently, you can create a new mouse, manipulate with items and hirelings, 
            level up, and save/load character as .json file;
          </li>
        </ol>
      </div>
    </section>
    <section class="popup__info">
      If you notice any bug or have an idea to update the app,<br> please contact me: 
      <a
        class="popup__link"
        href="https://brightsdays.github.io/contacts"
        target="_blank"
      >
        brightsdays
      </a>.
    </section>
  </popup-layout>
</template>

<script setup lang="ts">
import PopupLayout from './PopupLayout.vue'
</script>