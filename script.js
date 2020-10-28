const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBTN = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get Quote From API
async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json(); /*parse json into JS object*/
        //If Aiuthor is blank, add 'Unknown'   
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
    } catch(error) {
        getQuote();
        console.log('no quote', error);
    }
}

//On Load
getQuote();