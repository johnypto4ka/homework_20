function resetForm (formElement) {
  formElement.reset()

  const inputHiddenElements = [...formElement.querySelectorAll('[type="hidden"]')]

  inputHiddenElements.forEach(item => {
    item.value = ''
  })
}

export { resetForm }
