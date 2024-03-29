import { BodyBack, PackBack, BodyIndexes, PackIndexes } from '../types/inventory'
import { Card, Bank } from '../types/cards'

export const onDragging = (event: DragEvent, item: Card) => {
  if (event.dataTransfer) {    
    const data: Card = {
      id: (event.target as Node).parentElement?.id as BodyIndexes | PackIndexes || null,
      title: item.title,
      stat: item.stat || null,
      image: item.image,
      type: item.type || null,
      group: item.group,
      used: 0,
      description: item.description || null,
      clear: item.clear || null,
      hirelingIndex: (event.target as Node).parentElement?.dataset.index || null,
      warband: (event.target as Node).parentElement?.dataset.warband || null
    }

    if (((event.target as Node).childNodes[1] as HTMLElement).classList.contains('status')) {
      (event.target as Node).childNodes[1].childNodes[0].childNodes.forEach(point => {
        if ((point as HTMLElement).classList?.contains('used')) {
          data.used += 1
        }
      })
    }
    
    if (data.id) event.dataTransfer.setData('id', data.id)
    event.dataTransfer.setData('text', data.title)
    if (data.stat) event.dataTransfer.setData('stat', data.stat)
    event.dataTransfer.setData('image', data.image)
    if (data.type) event.dataTransfer.setData('type', data.type)
    if (data.group) event.dataTransfer.setData('group', data.group)
    event.dataTransfer.setData('used', data.used.toString())    
    if (data.description) event.dataTransfer.setData('description', data.description)
    if (data.clear) event.dataTransfer.setData('clear', data.clear)
    if (data.hirelingIndex) event.dataTransfer.setData('hirelingIndex', data.hirelingIndex.toString())
    if (data.warband) event.dataTransfer.setData('warband', data.warband.toString())
  }
}

export const allowDrop = (event: DragEvent) => {
  event.preventDefault()
  ;(event.target as HTMLElement).classList.add('droppable')
}

export const leaveDrag = (event: DragEvent) => {
  event.preventDefault()
  ;(event.target as HTMLElement).classList.remove('droppable')
}

export const drop = async (event: DragEvent, type: string, store: any) => {
  event.preventDefault()

  const firstChild: ChildNode = (event.target as Node).childNodes[0]

  const slotId = event.dataTransfer
      ? event.dataTransfer.getData('id')
      : null

  const data = event.dataTransfer
    ? {
      id: event.dataTransfer.getData('id'),
      title: event.dataTransfer.getData('text'),
      stat: event.dataTransfer.getData('stat'),
      image: event.dataTransfer.getData('image'),
      type: event.dataTransfer.getData('type'),
      group: event.dataTransfer.getData('group'),
      used: event.dataTransfer.getData('used'),
      description: event.dataTransfer.getData('description'),
      clear: event.dataTransfer.getData('clear')
    }
    : null

  const moveFrom = async () => {    
    const hirelingIndex = event.dataTransfer?.getData('hirelingIndex')
    const warband = event.dataTransfer?.getData('warband') === 'warband' ? true : false

    if (slotId && slotId.includes('bnk')) {
      let newBank = store.bank

      newBank[+slotId.substring(5)] = {
        name: slotId,
        item: null
      }
      newBank = newBank.filter((item: Bank) => item.item !== null)
      newBank.forEach((item: Bank, index: number) => item.name = `bnk__${index}`)
      newBank.push({
        name: `bnk__${newBank.length}`,
        item: null
      })        

      store.updateBankItems(newBank)
    }

    if (slotId && slotId.includes('grit')) {
      store.updateGrit({
        ...store.grit,
        [slotId]: {
          name: slotId,
          item: null
        }
      })
    }
    
    if (slotId && !hirelingIndex && warband) {
      if (Object.keys(store.bodyBack).includes(slotId)) {
        store.updateWarbandItems('bodyBack', {
          ...store.warband.bodyBack as BodyBack,
          [slotId]: {
            name: slotId,
            item: null,
            used: 0
          }
        })
      }

      if (Object.keys(store.packBack).includes(slotId)) {
        store.updateWarbandItems('packBack', {
          ...store.warband.packBack as PackBack,
          [slotId]: {
            name: slotId,
            item: null,
            used: 0
          }
        })
      }
    }

    if (slotId && !hirelingIndex && !warband) {
      if (Object.keys(store.bodyBack).includes(slotId)) {
        store.updateItems('bodyBack', {
          ...store.bodyBack as BodyBack,
          [slotId]: {
            name: slotId,
            item: null,
            used: 0
          }
        })
      }

      if (Object.keys(store.packBack).includes(slotId)) {
        store.updateItems('packBack', {
          ...store.packBack as PackBack,
          [slotId]: {
            name: slotId,
            item: null,
            used: 0
          }
        })
      }
    }

    if (slotId && hirelingIndex) {
      if (Object.keys(store.bodyBack).includes(slotId)) {
        store.updateHirelingItems('bodyBack', {
          ...store.hirelings[hirelingIndex].bodyBack as BodyBack,
          [slotId]: {
            name: slotId,
            item: null,
            used: 0
          }
        }, hirelingIndex)
      }

      if (Object.keys(store.packBack).includes(slotId)) {
        store.updateHirelingItems('packBack', {
          ...store.hirelings[hirelingIndex].packBack as PackBack,
          [slotId]: {
            name: slotId,
            item: null,
            used: 0
          }
        }, hirelingIndex)
      }
    }
  }
    
  const moveTo = () => {
    const id = (event.target as HTMLElement).id
      ? (event.target as HTMLElement).id
      : null

    const hirelingIndex = firstChild.parentElement?.dataset.index
    const warband = firstChild.parentElement?.dataset.warband === 'warband' ? true : false

    if (data && id && type === 'bank') {
      const nextId = `bnk__${+id.substring(5) + 1}`

      const newBank = store.bank
      newBank[+id.substring(5)] = {
        name: id,
        item: data
      }
      newBank[+id.substring(5) + 1] = {
        name: nextId,
        item: null
      }

      store.updateBankItems(newBank)
    }
    
    if (data && id && type === 'grit') {
      store.updateGrit({
        ...store.grit,
        [id]: {
          name: id,
          item: data
        }
      })
    }

    if (data && id && !hirelingIndex && warband) {
      if (type === 'bodyBack') {        
        store.updateWarbandItems('bodyBack', {
          ...store.warband.bodyBack as BodyBack,
          [id]: {
            name: id,
            item: data
          }
        })
      }

      if (type === 'packBack') {
        store.updateWarbandItems('packBack', {
          ...store.warband.packBack as PackBack,
          [id]: {
            name: id,
            item: data
          }
        })
      }
    }

    if (data && id && !hirelingIndex && !warband) {
      if (type === 'bodyBack') {
        store.updateItems('bodyBack', {
          ...store.bodyBack as BodyBack,
          [id]: {
            name: id,
            item: data
          }
        })
      }

      if (type === 'packBack') {
        store.updateItems('packBack', {
          ...store.packBack as PackBack,
          [id]: {
            name: id,
            item: data
          }
        })
      }
    }

    if (data && id && hirelingIndex) {
      if (type === 'bodyBack') {
        store.updateHirelingItems('bodyBack', {
          ...store.hirelings[hirelingIndex].bodyBack as BodyBack,
          [id]: {
            name: id,
            item: data
          }
        }, hirelingIndex)
      }

      if (type === 'packBack') {
        store.updateHirelingItems('packBack', {
          ...store.hirelings[hirelingIndex].packBack as PackBack,
          [id]: {
            name: id,
            item: data
          }
        }, hirelingIndex)
      }
    }
  }
  
  const cases = {
    items: firstChild && data?.group === 'items'
      && !slotId?.includes('bnk') 
      && (type === 'bodyBack' || type === 'packBack' || type === 'bank' || type === 'drop'),
    bankItems: firstChild && data?.group === 'items'
      && slotId?.includes('bnk') && type !== 'bank' 
      && (type === 'bodyBack' || type === 'packBack' || type === 'drop'),
    conditions: firstChild && data?.group === 'conditions'
      && (type === 'packBack' || type === 'grit' || type === 'drop'),
    drop: type === 'drop' && (data?.group === 'items' || data?.group === 'conditions')
  }  

  if ((event.target as HTMLElement).id
      && (cases.items || cases.bankItems || cases.conditions || cases.drop)) {
      await moveFrom()
      moveTo()
  } else {
    (event.target as HTMLElement).classList.remove('droppable')
    return null
  }

  (event.target as HTMLElement).classList.remove('droppable')
}