let globalIsEditing = false
let globalCurrentItem = null
let globalNames = ['Liz', 'Cléo', 'Nícolas', 'Gael']

window.addEventListener('load', () => {
  preventFormSubmit()
  activateInput()
  renderList()
})

function preventFormSubmit() {
  const handleSubmit = (event) => event.preventDefault()
  const form = document.querySelector('form')
  form.addEventListener('submit', handleSubmit)
}

function activateInput() {
  const inputName = getInput()

  inputName.addEventListener('keyup', (event) => {
    if (event.key !== 'Enter') return // Enquanto o usuário não digital Enter, nada será feito
    
    const currentName = event.target.value.trim() // Obtém o valor digitado sem espaços em branco

    if (currentName === '') {
      clear()
      return
    }

    if (globalIsEditing) {
      console.log('edit')
      globalNames[globalCurrentItem] = currentName
    } else {
      console.log('add')
      globalNames = [...globalNames, currentName]
    }

    clear()
    renderList()
  })
}

const getInput = () => document.querySelector('#inputName')

// Limpa os dados do formulário e "reinicializa" a edição.
const clear = () => {
  const inputName = getInput()
  inputName.value = ''
  inputName.focus()
  globalIsEditing = false
}

// Renderiza a lista.
function renderList() {
  function createDeleteButton(index) {
    const removeItem = () => {
      globalNames = globalNames.filter((_, i) => i !== index)
      renderList()
    }

    const buttonElement = document.createElement('button')
    buttonElement.textContent = 'x'
    buttonElement.classList.add('deleteButton')
    buttonElement.addEventListener('click', removeItem)

    return buttonElement
  }

  // Função auxiliar para criar o item de lista de forma clicável.
  function createNameSpan(currentName, currentItem) {
    const editItem = () => {
      const inputName = getInput()
      globalIsEditing = true
      globalCurrentItem = currentItem
      inputName.value = currentName
      inputName.focus()
    }

    const spanElement = document.createElement('span')
    spanElement.textContent = currentName
    spanElement.classList.add('clickable')
    spanElement.addEventListener('click', editItem)

    return spanElement
  }

  const divNames = document.querySelector('#names')
  const ul = document.createElement('ul')

  /**
   * Para cada nome, cria-se um <li> correspondente, adicionando um botão para exclusão 
   * e tornando o item clicável para edição.
   */
  for (let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i]

    let deleteButton = createDeleteButton(i)
    let nameSpan = createNameSpan(currentName, i)

    let li = document.createElement('li')
    li.appendChild(deleteButton)
    li.appendChild(nameSpan)

    ul.appendChild(li)
  }

  divNames.innerHTML = '' // Limpa os dados.
  divNames.appendChild(ul)
}
