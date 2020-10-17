//creating a asyncronous function to get quote from apis
const quoteContainer = document.querySelector('#quote-container');
const quote = document.querySelector('#quote');
const author = document.querySelector('.quote-author');
const newBtn = document.querySelector('#new-quote');
const twitterBtn = document.querySelector('#twitter');
const loader = document.getElementById('loader');
let errCounter = 0;
//Show Loading
function showLoadingSpinner() {
	// this hidden is a js inbuilt object which hides things
	// at first loader is not hidden and quotecontainer is absent
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
	// after we get out quote quotecontainer appears and loader is hidden
	if (!loader.hidden) {
		loader.hidden = true;
		quoteContainer.hidden = false;
	}
}
//no idea why we gave async function
async function getQuote() {
	// first we display loader only till we get a new quote
	showLoadingSpinner();
	//getting url of apis and setting a proxy server to use it
	const proxyUrl = 'https://warm-beyond-91605.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try {
		// fetching data from the api and storing it in a variable
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		console.log(data);
		quote.innerText = data.quoteText;
		//if author is blank
		if (data.quoteAuthor === '') {
			author.innerText = 'Unknown';
		} else {
			author.innerText = data.quoteAuthor;
		}
		//small font size class for large quotes
		if (data.quoteText.length > 120) {
			quote.classList.add('quote-text-long');
		} else {
			quote.classList.remove('quote-text-long');
		}
		//after we get the data and fill quote container we hide loader
		hideLoadingSpinner();
	} catch (error) {
		console.log('Some issue with code');
		errCounter++;
		if (errCounter < 35) {
			getQuote();
		} else {
			alert('Sorry We faced some issues please refresh the webpage');
		}
	}
}

function tweetQuote() {
	//getting info about what text to tweet (innertext of quote and author)
	const quoteText = quote.innerText;
	const authorText = author.innerText;
	// this url is provided to us by twitter and  this is how by using text = "out text" we add some prewritten text to tweet
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
	window.open(twitterUrl, '_blank');
}
getQuote();

//eventListeners  if clicked following functions trigger
twitterBtn.addEventListener('click', tweetQuote);
newBtn.addEventListener('click', getQuote);
