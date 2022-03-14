class Posts {
  constructor (containerElement) {
    this.containerElement = containerElement
    this.baseUrl = '/api/posts'
    this.activeItem = null
    this.init()
  }

  init () {
    document.addEventListener('DOMContentLoaded', this.handleDOMReady.bind(this))
    window.addEventListener('form.sent', this.handleDataSent.bind(this))
    window.addEventListener('post.removed', this.handlePostRemoved.bind(this))
    this.containerElement.addEventListener('click', this.handleClickListItem.bind(this))
  }

  handleDOMReady () {
    fetch(this.baseUrl)
      .then(response => response.json())
      .then(data => {
        const { list } = data
        this.render(list)
      })
  }

  handleDataSent ({ detail }) {
    const { data } = detail

    this.render(data.list)
  }

  handleClickListItem (event) {
    const listItemElement = event.target.closest('.list__item')

    if (listItemElement) {
      const { id } = listItemElement.dataset
      console.log(id)
      this.toggleActiveListItem(listItemElement)

      const customEvent = new CustomEvent('posts.click', {
        detail: { id }
      })
      window.dispatchEvent(customEvent)
    }
  }

  handlePostRemoved ({ detail }) {
    const { data } = detail
    const { list } = data

    this.render(list)
  }

  toggleActiveListItem (itemElement) {
    if (this.activeItem) {
      this.activeItem.classList.remove('list__item_active')
    }

    itemElement.classList.add('list__item_active')
    this.activeItem = itemElement
  }

  buildTemplate (data) {
    return `
      <div class="list__item" data-id="${data.id}">
        <h4> ${data.title} </h4>
        <p> ${data.createdAt} </p>
      </div>
    `
  }

  render (data) {
    console.log(data)
    const template = data.map(item => {
      return this.buildTemplate(item)
    })

    this.containerElement.innerHTML = template.join('')
  }
}

export { Posts }
