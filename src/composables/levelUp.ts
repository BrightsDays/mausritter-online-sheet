import { useCharacterStore } from '../store/character'
import { useNotificationsStore } from '../store/notifications'
import { StatKeys } from '../types/character'
import rollDices from './rollDices'

export const levelUp = (levels: number) => {
  const characterStore = useCharacterStore()
  const notificationStore = useNotificationsStore()

  let newHp = 0

  for (let index = 1; index <= levels; index++) {
    ['str', 'dex', 'wil'].forEach((stat: string) => {
      const newRoll = rollDices(1, 20)

      if (newRoll > characterStore.stats[stat as StatKeys].max) {
        notificationStore.setNotification({
          type: 'info',
          message: `New ${stat} roll is equal ${newRoll} - it's more than previous, so charater stat increase by 1`
        })
        characterStore.setStat(stat as StatKeys, characterStore.stats[stat as StatKeys].max + 1)
        characterStore.setMaxStat(stat as StatKeys, characterStore.stats[stat as StatKeys].max + 1)
      } else {
        notificationStore.setNotification({
          type: 'info',
          message: `New ${stat} roll is equal ${newRoll} - it's less than previous, so charater stat don't increase`
        })
      }
    })

    if ((characterStore.level + index) === 2) {
      const roll = rollDices(2, 6)
      newHp = roll > newHp ? roll : newHp
    } else if ((characterStore.level + index) === 3) {
      const roll = rollDices(3, 6)
      newHp = roll > newHp ? roll : newHp
    } else {
      const roll = rollDices(4, 6)
      newHp = roll > newHp ? roll : newHp
    }
  }

  if (newHp > characterStore.stats.hp.max) {
    notificationStore.setNotification({
      type: 'info',
      message: `New HP roll is equal ${newHp} - it's more than previous, so now 
      charater have ${newHp} hp`
    })
    characterStore.setStat('hp', newHp)
    characterStore.setMaxStat('hp', newHp)
  } else {
    notificationStore.setNotification({
      type: 'info',
      message: `New HP roll is equal ${newHp} - it's less than previous, so now 
      charater have ${characterStore.stats.hp.max} + 1 hp`
    })
    characterStore.setStat('hp', characterStore.stats.hp.max + 1)
    characterStore.setMaxStat('hp', characterStore.stats.hp.max + 1)
  }
}