const BASE_URL = `https://quote-garden.herokuapp.com/api/v3/quotes`

export const createRandomQuoteNode = async (loadData, appNode) => {
  createLoadingNode(appNode)
  const quote = await loadData()
  //this is for clear the loading spinner
  appNode.innerHTML = ''
  const quoteContainer = document.createElement('div')
  quoteContainer.className = 'quote'
  quoteContainer.append(quote.quoteText)

  const authorQuoteContainer = document.createElement('div')
  authorQuoteContainer.className = 'author__quote--wrapper'
  authorQuoteContainer.addEventListener(
    'click',
    createAuthorQuotesNode(loadData, appNode, quote.quoteAuthor)
  )

  const authorInfo = document.createElement('div')
  authorInfo.className = 'author__info'
  authorQuoteContainer.append(authorInfo)

  const authorName = document.createElement('h3')
  authorName.className = 'author__name'
  authorName.append(quote.quoteAuthor)
  authorInfo.append(authorName)

  const quoteGenre = document.createElement('p')
  quoteGenre.className = 'quote__genre'
  quoteGenre.append(quote.quoteGenre)
  authorInfo.append(quoteGenre)

  const arrowRight = document.createElement('span')
  arrowRight.append('arrow_right_alt')
  arrowRight.className = 'material-icons md-light'
  authorQuoteContainer.append(arrowRight)

  appNode.append(quoteContainer, authorQuoteContainer)
}

const createAuthorQuotesNode = (loadData, appNode, author) => {
  return async (event) => {
    createLoadingNode(appNode)
    const quotes = await loadData(author.toLowerCase())
    //this is for clear the loading spinner
    appNode.innerHTML = ''

    const authorNameTitle = document.createElement('h3')
    authorNameTitle.className = 'quotesList__author'
    authorNameTitle.append(author)

    const listOfQuotes = document.createElement('ul')

    const listItemsQuotes = []
    quotes.forEach((quote) => {
      const quoteContainer = document.createElement('div')
      quoteContainer.className = 'quote'
      quoteContainer.append(quote.quoteText)

      listItemsQuotes.push(quoteContainer)
    })
    console.log(listItemsQuotes)
    listOfQuotes.append(...listItemsQuotes)

    appNode.append(authorNameTitle, listOfQuotes)
  }
}

const createLoadingNode = (appNode) => {
  appNode.innerHTML = ''
  const donutSpinner = document.createElement('div')
  donutSpinner.className = 'donutSpinner'

  appNode.append(donutSpinner)
}
