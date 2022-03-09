import { Modal } from 'bootstrap'
import { resetForm } from './helpers'

class Create {
  constructor (formElement) {
    this.formElement = formElement
    this.createPostButton = document.querySelector('#buttonCreatePost')

    this.baseUrl = '/api/posts'
    this.instensModal = Modal.getOrCreateInstance(document.querySelector('#blogModal'))

    this.init()
  }

  init () {
    this.formElement.addEventListener('submit', this.handleFormSubmit.bind(this))
    this.createPostButton.addEventListener('click', this.handlePostCreateClick.bind(this))
    window.addEventListener('post.edit', this.handlePostEdit.bind(this))
  }

  handleFormSubmit (event) {
    event.preventDefault()

    const post = {
      id: nanoid(),
      createdAt: this.currentDate()
    }

    const formData = new FormData(this.formElement)

    for (const [name, value] of formData) {
      if (value) {
        post[name] = value
      }
    }

    this.sendData(post)
    this.instensModal.hide()
    resetForm(this.formElement)
  }

  handlePostCreateClick () {
    resetForm(this.formElement)
    this.instensModal.show()

    this.formElement.setAttribute('data-method', 'POST')
  }

  handlePostEdit (event) {
    resetForm(this.formElement)
    this.instensModal.show()

    this.formElement.setAttribute('data-method', 'PUT')

    const { data } = event.detail

    for (const key in data) {
      this.formElement.querySelector(`[name="${key}"]`).value = data[key]
    }
  }

  sendData (posts) {
    const json = JSON.stringify(posts)
    const { method } = this.formElement.dataset
    let url = this.baseUrl

    if (method == 'PUT') {
      url = `${this.baseUrl}/${posts.id}`

      const event = new CustomEvent('form.saved', {
        detail: { posts }
      })
      window.dispatchEvent(event)
    }

    fetch(url, {
      method,
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const event = new CustomEvent('form.sent', {
          detail: { data }
        })
        window.dispatchEvent(event)
      })
  }

  currentDate () {
    const date = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }

    const stringtDate = date.toLocaleDateString('to-EN', options)
    return stringtDate
  }
}

export { Create }
