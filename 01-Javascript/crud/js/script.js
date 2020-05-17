window.addEventListener('load', start)

var globalNames = ['Nícolas', 'Gael', 'Liz', 'Cléo']
var inputName = null

function start() {
  inputName = document.querySelector('#inputName')
  preventFormSubmit()
  startInput()
  renderList()
}

function preventFormSubmit() {
  const form = document.querySelector('form')
  form.addEventListener('submit', event => event.preventDefault())
}

function startInput() {
  inputName.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      const insertName = newName => globalNames.push(newName) // Insere nome no vetor.
      insertName(event.target.value)
      renderList()
      console.log(globalNames)
    }
  })

  inputName.focus()
}

function renderList() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1) // Posição + qtdd elementos.
      renderList()
    }

    const buttonElement = document.createElement('button')
    buttonElement.classList.add('deleteButton')
    buttonElement.textContent = 'x'
    buttonElement.addEventListener('click', deleteName)
    return buttonElement
  }

  const divNames = document.querySelector('#names')
  divNames.innerHTML = '' // Limpa ao inserir.
  
  const ulElement = document.createElement('ul')
  
  for (let i = 0; i < globalNames.length; i++) {
    const currentName = globalNames[i]
    const buttonElement = createDeleteButton(i)

    const spanElement = document.createElement('span')
    spanElement.textContent = currentName

    const liElement = document.createElement('li')
    liElement.appendChild(buttonElement)
    liElement.appendChild(spanElement)

    ulElement.appendChild(liElement)
  }

  divNames.appendChild(ulElement)
  clearInput()
}

function clearInput() {
  inputName.value = ''
  inputName.focus()
}
