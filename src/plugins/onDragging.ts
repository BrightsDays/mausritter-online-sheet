export default (event: DragEvent) => {
  if (event.dataTransfer) {    
    const content = (event.target as Node).childNodes[0].textContent
    const id =  (event.target as Node).parentElement?.id
      ? (event.target as Node).parentElement?.id
      : null
    
    if (content) event.dataTransfer.setData('text', content)
    if (id) event.dataTransfer.setData('id', id)
  }
}