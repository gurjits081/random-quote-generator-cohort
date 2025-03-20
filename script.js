// import html2canvas from 'html2canvas';
const quoteContainer = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".quote_author");
const quoteGeneratorButton = document.querySelector(".quote_gen_btn");
const copyButton = document.querySelector(".copy_btn");
const twitterButton = document.querySelector(".twitter-share-button");

async function fetchQuote() {
    try {
        const quoteResponse = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
        if(!quoteResponse.ok) {
            throw new Error("Failed to fetch quote")
        }
        const quoteData = await quoteResponse.json();
        if(quoteData.success && quoteData.data) {
        quoteContainer.innerText = quoteData.data.content;
        quoteAuthor.innerText = quoteData.data.author;
        // Twitter share button fn
        const encodedQuote = encodeURIComponent(quoteData.data.content);
        twitterButton.href = `https://twitter.com/intent/tweet?text=${encodedQuote}`;
        }
    } catch (error) {
        console.log(error)
        quoteContainer.innerText ="Failed to fetch a quote. Please try again!";
        quoteAuthor.innerText = "";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchQuote();
})

quoteGeneratorButton.addEventListener('click', () => {
    fetchQuote();
})

  // copy functionality
  const quoteBody = document.querySelector(".quote");

  copyButton.addEventListener('click', () => {
    if(quoteBody.innerText.length) {
        navigator.clipboard.writeText(quoteBody.innerText)
        copyButton.innerText = "Copied!!!";
        setTimeout(() => {
           copyButton.innerText = "Copy Text";
        }, 2000)
    } else {
        throw new Error('Something went wrong while copying the text')
    }
  })

// Download button event listener
document.getElementById('download-btn').addEventListener('click', function () {
    const quoteContainer = document.getElementById('quote');
  
    // Convert the container to a canvas
    html2canvas(quoteContainer, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS if there are external images
      backgroundColor: '#fff' // Optional to avoid transparency
    }).then(function (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'quote-image.png';
      link.click();
    });
  });
  
  
