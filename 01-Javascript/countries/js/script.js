// Variáveis de estado
let tabCountries = null
let tabFavorites = null

let allCountries = []
let favoriteCountries = []

let countCountries = 0
let countFavorites = 0

let totalPopulation = 0
let totalPopulationFavorites = 0

let numberFormat = null

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tab-countries')
  tabFavorites = document.querySelector('#tab-favorites')

  countCountries = document.querySelector('#count-countries')
  countFavorites = document.querySelector('#count-favorites')

  totalPopulation = document.querySelector('#total-population-list')
  totalPopulationFavorites = document.querySelector('#total-population-favorites')

  numberFormat = Intl.NumberFormat('pt-BR')

  fetchCountries()
})

function fetchCountries() {

}