import { Modal } from 'bootstrap'
import { nanoid } from 'nanoid'
import { resetForm } from './helper'

class Form {
  constructor(formElement) {
    this.formElement = formElement
    this.buttonCreatePostModal = document.querySelector('#buttonCreatePost')
    this.baseUrl = 'http://localhost:8080/api/posts'
    this.instanceModal = Modal.getOrCreateInstance(document.querySelector('#formModal'))

    this.init()
  }
  init() {
    this.formElement.addEventListener('submit', this.handleFormSubmit.bind(this))
    this.buttonCreatePostModal.addEventListener('click', this.handleCreatePost.bind(this))
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
    this.instanceModal.hide()
    resetForm(this.formElement)
  }

  handleCreatePost () {
    resetForm(this.formElement)
    this.instanceModal.show()

    this.formElement.setAttribute('data-method', 'POST')
  }

  handlePostEdit (event) {
    resetForm(this.formElement)
    this.instanceModal.show()

    this.formElement.setAttribute('data-method', 'PUT')

    const { data } = event.detail
    console.log(data)
    for (const key in data) {
      this.formElement.querySelector(`[name="${key}"]`).value = data[key]
    }
  }

  async sendData (post) {
    const json = JSON.stringify(post)
    const { method } = this.formElement.dataset
    let url = this.baseUrl

    if (method == 'PUT') {
      url = `${this.baseUrl}/${post.id}`

      const event = new CustomEvent('form.edited', {
        detail: { post }
      })
      window.dispatchEvent(event)
    }

    const responce = await fetch(url, {
      method,
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      const data = await responce.json()
      const event = new CustomEvent('form.sent', {
        detail: { data }
      })
      window.dispatchEvent(event)
  }

  currentDate () {
    const date = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }

    const stringDate = date.toLocaleDateString('to-EN', options)
    return stringDate
  }
}

export { Form }
