// Get Quotes From API
let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        // Hide Quote, Show Loader
        showLoadingSpinner();
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        let random_index = getRandomInt(apiQuotes.length);
        quote = apiQuotes[random_index];

        // Check if author is null
        if (!quote.author){
            authorText.textContent = "Anonymous";
        }
        else {
            authorText.textContent = quote.author;
        }
        
        // Check Quote length to determine styling
        if (quote.text.length > 100) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        // Set Quote, Hide Loader
        quoteText.textContent = quote.text;
        removeLoadingSpinner();

    } catch(error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);
// On load
getQuotes();