// Variáveis de Estado
let tabUsers = null
let tabStatistics = null

let allUsers = []

let totalUsers = 0 // Usuários encontrados

let countMaleGender = 0
let countFemaleGender = 0

let agesSum = 0
let agesAverage = 0

let numberFormat = null

let searchInput = null
let searchButton = null

let usersList = null

window.addEventListener('load', () => {
  tabUsers = document.querySelector('#tab-users')
  tabStatistics = document.querySelector('#tab-statistics')

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

  fetchUsers()
})

const fetchUsers = async () => {
  try {
    const url = await 'https://randomuser.me/api/?results=100'
    const res = await fetch(url)
    const json = await res.json()

    allUsers = json.results.map(user => {
      const { name, picture, dob, gender } = user

      return {
        name: name.first + ' ' + name.last,
        picture: picture.thumbnail,
        age: dob.age,
        gender
      }
    })
    
    // console.log(allUsers)
    render()

  } catch (error) {
    console.log(`API Error: ${error}`)
  }
}

const render = () => {
  preventFormSubmit()
  checkEmptyInput()
  searchUser()
  
}

const preventFormSubmit = () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', event => event.preventDefault())
}

const searchUser = () => {
  searchInput.addEventListener('keyup', e => {
    const filteredUsers = allUsers.filter(character => {
      return character.name.includes(e.target.value) // ou e.key
    })

    console.log(filteredUsers)
    renderUsers(filteredUsers)
  })
}

const renderUsers = users => {
  totalUsers.textContent = users.length

  const usersHTML = users.map(user => {
    // console.log(user.gender === 'female')

    return `
      <li class="character">
        <p>${user.name}</p>
        <p>${user.age}</p>
        <img src="${user.picture}" alt="${user.name}">
      </li>
    `
    })
    .join('')

  usersList.innerHTML = usersHTML

  renderSumAges(users)
}

const renderSumAges = users => {
  const ages = users
    .map(user => user.age)
    .reduce((acc, curr) => acc + curr)
  agesSum.textContent = ages
}

const checkEmptyInput = () => {
  searchInput.addEventListener('input', () => {
    if (searchInput.value !== '') {
      searchButton.disabled = false
    } else {
      searchButton.disabled = true
    }
  })
}
