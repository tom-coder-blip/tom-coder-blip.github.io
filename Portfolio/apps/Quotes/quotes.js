const quoteText = document.querySelector(".quote"),
authorName = document.querySelector(".name"),
quoteBtn = document.querySelector("button"),
soundBtn = document.querySelector(".sound"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter");

//random quote function
function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("https://random-quotes-freeapi.vercel.app/api/random")
    .then(res => res.json()).then(result => {
        console.log(result);
        quoteText.innerText = result.quote;
        authorName.innerText = result.author || "Unknown";
        quoteBtn.innerText = "New Quote";
        quoteBtn.classList.remove("loading");

    })

    .catch(error => console.error("Failed to fetch quote:", error));
}

soundBtn.addEventListener("click", ()=>{
    //speechSynthesisUtterance is a web speech api that represents a speech request
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    speechSynthesis.speak(utterance)
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quote.innerText);
})

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText} by ${authorName.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);