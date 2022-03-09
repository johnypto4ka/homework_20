function resetForm (formElement) {
  formElement.reset()

  const hiddenInputElements = [...formElement.querySelectorAll('[type="hidden"]')]

  hiddenInputElements.forEach(item => {
    item.value = ''
  })
}

export { resetForm }
