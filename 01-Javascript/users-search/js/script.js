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

  // fetchUsers()
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
  
}