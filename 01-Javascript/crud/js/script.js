window.addEventListener('load', start)

var globalNames = ['Nícolas', 'Gael', 'Liz', 'Cléo']
var inputName = null
var isEditing = false
var currentIndex = null

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
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        const updateName = newName => globalNames[currentIndex] = newName
        updateName(event.target.value)
        console.log('edit')
      } else {
        const insertName = newName => globalNames.push(newName) // Insere nome no vetor.
        insertName(event.target.value)
        console.log('insert')
      }

      renderList()
    }
  })
  
  isEditing = false // Desabilita o padrão de edição.
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

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name
      inputName.focus()
      isEditing = true
      currentIndex = index
    }

    const spanElement = document.createElement('span')
    spanElement.classList.add('clickable')
    spanElement.textContent = name
    spanElement.addEventListener('click', editItem)
    return spanElement
  }

  const divNames = document.querySelector('#names')
  divNames.innerHTML = '' // Limpa ao inserir.
  
  const ulElement = document.createElement('ul')
  
  for (let i = 0; i < globalNames.length; i++) {
    const currentName = globalNames[i]

    const buttonElement = createDeleteButton(i)
    const spanElement = createSpan(currentName, i)

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
