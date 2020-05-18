window.addEventListener('load', start)

function start() {
  render()
}

function render() {
  const form = document.querySelector('form')

  form.addEventListener('change', () => {
    const inputRed = document.querySelector('#inputRed').value
    const inputGreen = document.querySelector('#inputGreen').value
    const inputBlue = document.querySelector('#inputBlue').value

    changeColor(inputRed, inputGreen, inputBlue)
    changeValue(inputRed, inputGreen, inputBlue)
  })
}

function changeColor(inputRed, inputGreen, inputBlue) {
  const square = document.querySelector('.square')
  square.style.backgroundColor = `rgb(${inputRed}, ${inputGreen}, ${inputBlue})`
}

function changeValue(inputRed, inputGreen, inputBlue) {
  document.querySelector('#valueRed').value = inputRed
  document.querySelector('#valueGreen').value = inputGreen
  document.querySelector('#valueBlue').value = inputBlue
}