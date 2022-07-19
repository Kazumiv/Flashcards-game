var cards = [];

getSavedCards();

function getSavedCards(){
    let saved = localStorage.getItem("cards");
    if(saved){
        cards = JSON.parse(saved);
    };
};

function createCard(){
    let question = document.getElementById("questionInput").value;
    let answer = document.getElementById("answerInput").value;

    if(!question || !answer){
        console.log("Question or answer is missing")
        return;
    }

    console.log(cards);
    let cardAlreadyCreated;
    if(cards){
        for(card of cards){
            if(card.question == question){
                cardAlreadyCreated = true;
                break;
            };
        };
    }

    if(cardAlreadyCreated){
        console.log("Card already created");
    } else {
        cards.push({question,answer});
        saveCardsToLocalStorage();
        console.log("Created");
        clearInputs();
    }
    
};

function clearInputs(){
    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";
};

function saveCardsToLocalStorage(){
    localStorage.setItem("cards",JSON.stringify(cards));
};