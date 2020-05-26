let allUsers = []

let totalUsers = 0

let countMaleGender = 0
let countFemaleGender = 0

let agesSum = 0
let agesAverage = 0

let numberFormat = null

let searchInput = null
let searchButton = null

let usersList = null

let loader = null
let body = null

let usersBox = null
let statiticsBox = null

window.addEventListener('load', () => {
  totalUsers = document.querySelector('#total-users')

  countMaleGender = document.querySelector('#count-male-gender')
  countFemaleGender = document.querySelector('#count-female-gender')

  agesSum = document.querySelector('#ages-sum')
  agesAverage = document.querySelector('#ages-average')

  numberFormat = Intl.NumberFormat('pt-BR')

  searchInput = document.querySelector('#search-input')

  searchButton = document.querySelector('#search-button')
  searchButton.disabled = true

  usersList = document.querySelector('#users-list')

  loader = document.querySelector(".loader")
  body = document.querySelector('body')

  usersBox = document.querySelector('#users-box')
  statiticsBox = document.querySelector('#statistics-box')

  fetchUsers()
})

const fetchUsers = async () => {
  try {
    const url = 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
    const res = await fetch(url)
    const json = await res.json()

    allUsers = json.results.map(user => {
      const { name, picture, dob, gender, location } = user

      return {
        name: name.first + ' ' + name.last,
        picture: picture.thumbnail,
        age: dob.age,
        gender,
        location: location.state
      }
    })

    // console.log(allUsers)

    loading()

  } catch (error) {
    console.log(`API Error: ${error}`)
  }
}

// Após 3 segundos o "loading" será removido e tela será renderizada.
const loading = () => {
  setTimeout(() => {
    body.removeChild(loader)
    render()
  }, 1000)
}

const render = () => {
  preventFormSubmit()
  checkEmptyInput()
  searchUser()
}

// Evita o comportamento padrão.
const preventFormSubmit = () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', event => event.preventDefault())
}

// Busca o usuário de acordo com a tecla digitada.
const searchUser = () => {
  searchInput.addEventListener('keyup', event => {
    const filteredUsers = allUsers.filter(character => {
      return lowerName(character.name).includes(lowerName(event.target.value)) // ou event.key
    })

    // console.log(filteredUsers)

    renderUsers(filteredUsers)
    renderAges(filteredUsers)
    renderGender(filteredUsers)
  })
}

const lowerName = name => name.toLowerCase()

// Renderiza os usuários na tela de acordo com o nome digitado.
const renderUsers = users => {
  totalUsers.textContent = `${users.length} user(s)`

  const usersHTML = users.map(user => {
    return `
      <li class="character">
        <img src="${user.picture}" alt="${user.name}">
        <p class="name">${user.name}, </p>
        <p>${user.age}, </p>
        <p>${user.gender}</p>
      </li>
    `
  }).join('')

  usersList.innerHTML = usersHTML
}

const renderAges = users => {
  const totalUsers = users.length
  const ages = users.reduce((acc, curr) => acc + curr.age, 0)
  agesSum.textContent = `Sum: ${formatNumber(ages)}`
  agesAverage.textContent = `Average: ${formatNumber((ages / totalUsers).toFixed(2))}`
}

const renderGender = users => {
  const maleGender = users.filter(user => user.gender === 'male')
  const femaleGender = users.filter(user => user.gender === 'female')
  countMaleGender.textContent = `Male gender: ${maleGender.length}`
  countFemaleGender.textContent = `Female gender: ${femaleGender.length}`
}

const checkEmptyInput = () => {
  searchInput.addEventListener('input', _event => {
    if (searchInput.value !== '') {
      searchButton.disabled = false
    } else {
      searchButton.disabled = true
      // clear()
    }
  })
}

const formatNumber = number => numberFormat.format(number)

const clear = () => {
  console.log('clear')
  usersBox.innerHTML = ''
  statiticsBox.innerHTML = ''
}
