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

function editCards(){
    let ol = document.getElementById("editCardList");
    ol.innerHTML = "";
    cards.forEach((card,index)=>{
        ol.innerHTML+=`
        <li>
            <input value="${card.question}" type="text" id="question${index}" placeholder="Question">
            <input value="${card.answer}" type="text" id="answer${index}" placeholder="Answer">
            <button onclick="updateCard(${index})">Update</button>
            <button onclick="deleteCard(${index})">Delete</button>
        </li>
        `
    });

    ol.innerHTML+= `        
        <button onclick="updateAllCards();">Update all</button>
    `
};

function updateCard(index){

    console.log(cards);
    let question = document.getElementById(`question${index}`).value;
    let answer = document.getElementById(`answer${index}`).value;

    cards.splice(index,1,{question,answer});
    console.log(cards);
    
    editCards();
    saveCardsToLocalStorage();
};

function updateAllCards(){
   cards = cards.map((card,index)=>{
       let question =  document.getElementById(`question${index}`).value;
       let answer = document.getElementById(`answer${index}`).value;

        return {question,answer}
    });
    
    console.log(cards);
    saveCardsToLocalStorage();
};

function deleteCard(index){
    console.log(cards);
    cards.splice(index,1);
    console.log(cards);
    editCards();
    saveCardsToLocalStorage();
};