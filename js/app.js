
let openedCards = []; 
let movesCounter = 0; 
let clicks = 0;
let min =  document.getElementById('minutes');
let sec =  document.getElementById('seconds');
let totalSeconds = 0;
let timer = setInterval(setup, 1000);

//for the Cards 
cardsList = cardsInitialize();
shuffle = shuffle(cardsList);

//for the stars
VisibleStar = starsInitialize();
DisplayCards (); 
 //start the game
$(".card").on('click', function(){
     Matcher(this);
});

//play again
$(".restart").on('click', function(){
     playagain();
});


//initialize the stars
function starsInitialize(){

     let domStars = [];
     domStars = document.getElementsByClassName("l");
     return transformer(domStars);
}

//hide the stars
function  HideStars(){

     let list = starsFactory();
     replacerStar(list);   
}

//check counter to hide star or end the game
function checkCounter(){
     if (movesCounter == 20) {
         VisibleStar.pop();
         HideStars();} 
     else if (movesCounter == 30){
          VisibleStar.pop();
          HideStars();}
     else if (movesCounter == 50) {
         VisibleStar.pop();
         HideStars();
         showLoseAlert();
 }}

//recreate the stars
function  starsFactory(){

     let list = document.createElement("ul");
     for (let i = 0 ; i < VisibleStar.length ; i++) {
          let li = document.createElement("li"); 
          li.innerHTML = VisibleStar[i];
          li.classList.add("l");
          list.appendChild(li);
 }
    return list; 
 } 

//replace the stars
function replacerStar(list){

      document.getElementsByClassName("stars")[0].innerHTML = list.innerHTML;
}

//initialize the cards
function cardsInitialize() {

      let domCards = [];
      domCards = document.getElementsByClassName('card');
      return transformer(domCards);

}


//to check if clicked stop the counter
function isClicked(card){

    if($ (card).hasClass("show") || $(card).hasClass("open")) {
        return true
    }
        return false;
}

//open card
 function Matcher(card){

    if(isClicked(card)) {
    return;}

    displaySymbol(card);
    markedOpened (card);
 }

//increment the counter
function incrementMoves(){

   movesCounter++;
   $('.moves').text(movesCounter);
   checkCounter();
}

//check if match
function isMatch(openedCards){

    openedCards[0]
    openedCards[1]

    let condition1 = openedCards[0].innerHTML != openedCards[1].innerHTML;
    let condition2 = $(openedCards[0]).is($(openedCards[1]));

    if(condition1 || condition2){

        return false;
    }
    return true;
}

//handle match case
function hanleMatchCase(openedCards){

     markAsMatched(openedCards);
}


  function markAsMatched(openedCards){

    for (let i = openedCards.length -1 ;i >= 0 ;  i--) {
    $(openedCards[i]).addClass("match animated bounce");
    }
 }

//handle unmatch case
function  handleUnMatchCase(openedCards){
    
    unMatchStyle(openedCards);
    setTimeout(function(){
        hideSymbol(openedCards);
        },1000);
 }


//unmatch style
function unMatchStyle(openedCards){
    
    for (let i = openedCards.length -1 ;i >= 0 ;  i--) {
    $(openedCards[i]).addClass(" unmatch animated tada");
    }
 }

//to hide symbol
function hideSymbol(openedCards){
    
    for (var i = openedCards.length -1 ;i>=0 ;  i--) {
    $(openedCards[i]).removeClass("open show unmatch animated tada");
    }

}


//to display symbol
 function displaySymbol(card) {
     $(card).addClass("show open ");
 }

//marked as open
function  markedOpened (card) {
    if(openedCards.length > 0 ) {

         incrementMoves();
         openedCards.push(card);

         if(isMatch(openedCards)){ 

            hanleMatchCase(openedCards);
            openedCards=[];}

        else {

            handleUnMatchCase(openedCards);
            openedCards=[];}
    } 
     else{
    openedCards.push(card);
    incrementMoves();
     }
checkMatchedAll();

}

//check if all match
function checkMatchedAll() {

     let all = true;
     $('.card').each(function(){
    return all = $(this).hasClass("match");
     });

    if(all) {

    if(movesCounter <= 20 ){ 
        showWinAlert(3);} 
   else if(movesCounter <= 30){  
        showWinAlert(2);}
    else if(movesCounter <= 49){
         showWinAlert(1);}
clearInterval ( timer );

     }
}


//win alert 
function showWinAlert(i){
    
  showAlert("Congratulation ! You WIN" , " with " + movesCounter + " moves! in " +min.innerHTML+":"+sec.innerHTML+ " TIME! With "+ i + " stars "  , 'success');
}

//lose alert
function showLoseAlert(){

  showAlert("GAME OVER ! you lose " , " with " + movesCounter + " moves ! in " +min.innerHTML+":"+sec.innerHTML+ "TIME!  " ,  'warning');

}

//transform from object to array
function transformer(obj) {
     let transformed = [];
     for ( let key in obj) {
         if (obj.hasOwnProperty(key)) {
         transformed.push(obj[key].innerHTML)
         }
     }
  return transformed;
}


//to display cards
function  DisplayCards () {
 
    let list = CardsFactory();
    replacer(list);
}

//to reaplce card
function replacer(list) {

     document.getElementsByClassName("deck")[0].innerHTML = list.innerHTML;
}

//TO CARDS
function  CardsFactory(){

      let list = document.createElement("ul");
      for (let i = 0 ; i < shuffle.length ; i++) {
         let li = document.createElement("li"); 
         li.innerHTML = shuffle[i];
         li.classList.add("card");
         list.appendChild(li);
         } 

return list
 }
 //SWEEN ALERT
 function showAlert(title, body, type) {

     swal({
         background: '#fff',
         title: title,
         text: body,
         type: type,
         showCancelButton: true,
         confirmButtonColor: '#02ccba',
         confirmButtonText: 'play again!',
         cancelButtonColor: '#d33'
         }).then((result) => {
            if (result.value) {
                  swal({
                  title: 'Play Again!',
                  text: 'Have Fun',
                  timer: 2000,
                  onOpen: () => {
                  swal.showLoading()
                   }
                  }).then((result) => {
                      if (
                        result.dismiss === swal.DismissReason.timer
                         ) {
                              playagain();
 
}})}})}


//play again
function playagain(){

      location.reload();
}


//time also
function setup(){

     ++totalSeconds;
     sec.innerHTML = pad(totalSeconds % 60);
     min.innerHTML = pad(parseInt(totalSeconds / 60));
}
//for times
function pad(val) {

     var valString = val + "";
     if (valString.length < 2) {
         return "0" + valString;
    } else {
         return valString;
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

