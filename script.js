const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

let apiQuotes = []

// Show new quote
function newQuote(){
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
    quoteText.textContent = quote.text
}

// Get Quotes from API
async function getQuotes(){
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
