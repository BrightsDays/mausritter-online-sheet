export default (event: DragEvent) => {
  if (event.dataTransfer) {
    let used = 0    

    const content = (event.target as Node).childNodes[0].textContent

    const id = (event.target as Node).parentElement?.id
      ? (event.target as Node).parentElement?.id
      : null

    if (((event.target as Node).childNodes[1] as HTMLElement).classList.contains('items__status')) {
      (event.target as Node).childNodes[1].childNodes[0].childNodes.forEach(point => {
        if ((point as HTMLElement).classList?.contains('points__item--used')) {
          used += 1
        }
      })
    }
    
    event.dataTransfer.setData('used', used.toString())

    if (content) event.dataTransfer.setData('text', content)
    if (id) event.dataTransfer.setData('id', id)
  }
}