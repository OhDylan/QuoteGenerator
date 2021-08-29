const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

const loader = document.getElementById('loader')

let apiQuotes = []

// Show loading
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

// Hide loading
function complete(){
    loader.hidden = true
    quoteContainer.hidden = false
}

// Show new quote
function newQuote(){
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // Check if author is blank, replace with 'Unknown'
    if(!quote.author)
    {
        authorText.textContent = 'Unknown'
    }
    else
    {
        authorText.textContent = quote.author
    }

    // Check quote length to determine styling
    if(quote.text.length > 120)
    {
        quoteText.classList.add('long-quote')
    }
    else
    {
        quoteText.classList.remove('long-quote')
    }
    // Set quote and hide loader
    quoteText.textContent = quote.text
    complete()
}

// Get Quotes from API
async function getQuotes(){
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try
    {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    }
    catch (error)
    {
        console.error(error)
    }
}

// To tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes()
