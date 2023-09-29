let deck_id = ''
let player1Wins = 0
let player2wins = 0

//fetch to grab random deck for play
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1') 
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deck_id = data.deck_id
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

//button click to deal two cards out
document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('h4').innerText = data.remaining
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)
        if(player1Val > player2Val) {
          document.querySelector('#result').innerText = 'Player 1 Wins!'
          player1Wins++
        } else if(player1Val < player2Val) {
          document.querySelector('#result').innerText = 'Player 2 Wins!'
          player2wins++
        } else {
          document.querySelector('#result').innerText = 'War Time!'
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

//helper function to convert all values to usable numbers
function convertToNum(val) {
  if (val === 'ACE') {
    return 14
  } else if (val === 'KING') {
    return 13
  } else if (val === 'QUEEN') {
    return 12
  } else if (val === 'JACK') {
    return 11
  } else {
    return Number(val)
  }
}
