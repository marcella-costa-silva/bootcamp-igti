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

window.addEventListener('load', () => {
  tabUsers = document.querySelector('#tab-users')
  tabStatistics = document.querySelector('#tab-statistics')

  totalUsers = document.querySelector('#total-users')

  countMaleGender = document.querySelector('#count-male-gender')
  countFemaleGender = document.querySelector('#count-female-gender')

  agesSum = document.querySelector('#ages-sum')
  agesAverage = document.querySelector('#ages-average')

  numberFormat = Intl.NumberFormat('pt-BR')

  fetchUsers()
})

async function fetchUsers() {
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
  
  console.log(allUsers)
  render()
}

function render() {
  preventFormSubmit()
  // userSearch()
}

function preventFormSubmit() {
  const form = document.querySelector('form')
  form.addEventListener('submit', event => event.preventDefault())
}
