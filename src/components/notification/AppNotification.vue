<template>
  <div
    class="notification-list"
  >
    <transition-group>
      <div
        v-for="notification in notificationList"
        :key="notification.message"
        tag="div" 
        class="notification"
        :class="notification.type"
      >
        <span class="message">{{ notification.message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useNotificationsStore } from '../../store/notifications'

const notificationsStore = useNotificationsStore()
const notificationList = notificationsStore.notificationList
</script>

<style lang="scss" scoped>
.notification-list {
    display: flex;
    position: fixed;
    bottom: 30px;
    right: 30px;
    max-width: 30%;
    flex-direction: column;
    gap: 20px;
    z-index: 3;
    
  .notification {
    padding: 20px;
    border-radius: 10px;

    .message {
      display: inline-block;
      color: var(--main);
      font-family: 'Ubuntu', sans-serif;
      font-size: 1.6em;
      white-space: pre-line;
    }

    &.info {
      background: rgb(65, 152, 65);
    }

    &.error {
      background: rgb(179, 61, 61);
    }
  }
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>