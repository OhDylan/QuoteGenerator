// Get Quotes from API
async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    try
    {
        const response = await fetch(apiUrl);
    }
    catch (error)
    {
        console.error(error)
    }
}