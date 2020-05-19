// Variáveis de estado
let tabCountries = null
let tabFavorites = null

let allCountries = []
let allFavorites = []

let countCountries = 0
let countFavorites = 0

let totalPopulationList = 0
let totalPopulationListFavorites = 0

let numberFormat = null

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tab-countries')
  tabFavorites = document.querySelector('#tab-favorites')

  countCountries = document.querySelector('#count-countries')
  countFavorites = document.querySelector('#count-favorites')

  totalPopulationList = document.querySelector('#total-population-list')
  totalPopulationListFavorites = document.querySelector('#total-population-favorites')

  numberFormat = Intl.NumberFormat('pt-BR')

  fetchCountries()
})

async function fetchCountries() {
  const url = await 'https://restcountries.eu/rest/v2/all'
  const res = await fetch(url)
  const json = await res.json()

  allCountries = json.map(country => {
    const { numericCode, translations, population, flag } = country

    return {
      id: numericCode,
      name: translations.br,
      population,
      flag
    }
  })

  console.log(allCountries)
  render()
}

function render() {
  renderCountryList()
  renderFavorites()
  renderSummary()
  handleCountryButtons()
}

function renderCountryList() {
  let countriesHTML = '<div>'

  allCountries.forEach(country => {
    const { id, name, population, flag } = country

    const countryHTML = `
      <div class="country">
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}" />
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${population}</li>
          </ul>
        </div>
      </div>
    `

    countriesHTML += countryHTML
  })

  countriesHTML += '</div>'
  tabCountries.innerHTML = countriesHTML
}

function renderFavorites() {
  let favoritesHTML = '<div>'

  allFavorites.forEach(country => {
    const { id, name, population, flag } = country

    const favoriteCountryHTML = `
      <div class="country">
        <div>
          <a id="${id}" class="waves-effect waves-light btn red darken-4">+</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}" />
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${population}</li>
          </ul>
        </div>
      </div>
    `
    favoritesHTML += favoriteCountryHTML
  })

  favoritesHTML += '</div>'
  tabFavorites.innerHTML = favoritesHTML
}

function renderSummary() {
  countCountries.textContent = allCountries.length
  countFavorites.textContent = allFavorites.length

  const totalPopulation = allCountries.reduce((acc, curr) => acc + curr.population, 0)
  totalPopulationList.textContent = totalPopulation

  const totalFavorites = allFavorites.reduce((acc, curr) => acc + curr.population, 0)
  totalPopulationListFavorites.textContent = totalFavorites
}

function handleCountryButtons() {}