import './styles/styles.css'
import { createRandomQuoteNode } from './utils/createNodes'
const BASE_URL = `https://quote-garden.herokuapp.com/api/v3/quotes`
// https://quote-garden.herokuapp.com/api/v3/quotes?author=bill%20gates&limit=3
const appNode = document.querySelector('#app')
const randomQuoteButton = document.querySelector('#random_quote')

let isLoading = false
const loadData = async (author) => {
  if (!author) {
    const dataJson = await fetch(`${BASE_URL}/random`)
    const dataParsed = await dataJson.json()
    return dataParsed.data[0]
  }
  const dataJson = await fetch(`${BASE_URL}?author=${author}&limit=3`)
  const dataParsed = await dataJson.json()
  return dataParsed.data
}

async function renderQuote() {
  try {
    await createRandomQuoteNode(loadData, appNode)
  } catch (err) {
    console.log(err)
  }
}
randomQuoteButton.addEventListener('click', () => {
  if (!isLoading) {
    appNode.innerHTML = ''
    renderQuote()
  }
})
renderQuote()
