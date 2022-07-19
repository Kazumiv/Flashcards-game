var cards;
var cardsLength;
var guessed;

function startGame(){
    getCardsFromLocalStorage();
    cardsLength = cards.length;
    guessed = 0;
    gameHead();
};

function stopGame(){
    document.getElementById("gameArea").innerHTML = `
        <div>
            You guessed ${guessed} from ${cardsLength}.
            Your media is ${Math.round(guessed/cardsLength*100)}%
        </div>
        <div>
            <button onclick="startGame();">Restart</button>
        </div>
    `;
};

function gameHead(){
    if(gameIsDone()){
        stopGame();
    } else {
        createCard();
    };
};

function getCardsFromLocalStorage(){
   cards = JSON.parse(localStorage.getItem("cards"));
};

function gameIsDone(){
    if(cards.length == 0){
        return true;
    };

    return false;
};

function createCard(){
    let card = getRandomCard();
    console.log(card);
    document.getElementById("gameArea").innerHTML = `
        <div id="card${card.index}">
            <div style="margin-bottom: 20px;margin-bottom: 20px;" class="question" id="card${card.index}Question">${card.question}</div>
            <button id="revealAnswer" onclick="revealAnswer()">Reveal answer</button>
            <div style="display: none;" id="answerArea">
                <div class="answer" id="card${card.index}Answer"><strong>${card.answer}</strong></div>
                <button onclick="answer(${card.index},true); gameHead();">Correct</button>
                <button onclick="answer(${card.index},false); gameHead();">Wrong</button>
            </div>
        </div>
    `;
};

function revealAnswer(){
    document.getElementById("revealAnswer").style.display = "none";
    document.getElementById("answerArea").style.display = "block";
};

function answer(index,isCorrect){
    cards.splice(index,1);
    if(isCorrect){
        console.log(guessed)
        guessed++;
    };
    console.log(cards);
};

function getRandomCard(){
    let randomIndex = Math.round(Math.random() * (cards.length - 1));
    return {
        question:cards[randomIndex].question,
        answer:cards[randomIndex].answer,
        index:randomIndex
    };
};