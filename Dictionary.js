const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultContainer = document.getElementById("result-container");
const wordTitle = document.getElementById("wordTitle");
const wordDescription = document.getElementById("wordDescription");
const audioButton = document.getElementById("audioButton");

//...............Add Listners to this Particular componenets...........//

searchButton.addEventListener("click", () => {
    search();
});

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        search();
    }
});

function search() {
    const searchTerm = searchInput.value.trim();//we use trim b/s it removes the space before and after the text in the "input text". 
    if (searchTerm ==='') {
        alert("Please Enter a word to Search...");
        return;
    }
    fetchDictionaryData(searchTerm);
}

async function fetchDictionaryData(searchTerm) {
    try { 
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
        if (!response.ok) {
            throw new Error("Faild to fetch Data.")
        }
        const data = await response.json();
        displayResult(data);
    }
    catch (error){
        console.log(error);
        alert("an error occured!");
    }
}

function displayResult(data) {
    resultContainer.style.display = 'block';

    const wordDeta = data[0];

    wordTitle.textContent = wordDeta.word;
    wordDescription.innerHTML = `
    <ul>
    ${wordDeta.meanings.map(meaning => `
        <li>
        <p><strong>Part of Speech: </strong> ${meaning.partOfSpeech}</p>
        <p><strong>Definition: </strong>${meaning.definitions[0].definition}</p>
        </li>
        `).join('\n')}
    </ul>
    `;
}

audioButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm ==='') {
        alert("Please Enter a word to Search...");
        return;
    }
    speak(searchTerm);
});

function speak(word) {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = 'eng-US';
    speech.volume =2 ;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}