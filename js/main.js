let deck_id = ''
let player1Cards = []
let player2Cards = []

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
        document.querySelector('h3').innerText = data.remaining
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)
        if(player1Val > player2Val) {
          document.querySelector('#result').innerText = 'Player 1 Wins!'
          player1Cards.push(player1Val, player2Val)
        } else if(player1Val < player2Val) {
          document.querySelector('#result').innerText = 'Player 2 Wins!'
          player2Cards.push(player2Val, player1Val)
        } else {
          document.querySelector('#result').innerText = 'War Time!'
          let war = warTime(player1Cards, player2Cards)
          if (war > 0) {
            document.querySelector('#war').innerText = 'Player 1 Wins the War!'
          } else {
            document.querySelector('#war').innerText = 'Player 2 Wins the War!'
          }
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

//compare first three card values and determine who won
function warTime(arr1, arr2) {
  let p1Total = 0
  let p2Total = 0
  if(arr1.length < 3) {
    p1Total = arr1.reduce((acc, curr) => acc + curr, 0);
    p2Total = arr2.slice(0, 3).reduce((acc, curr) => acc + curr, 0);
  } else if(arr2.length < 3) {
    p2Total = arr2.reduce((acc, curr) => acc + curr, 0);
    p1Total = arr1.slice(0, 3).reduce((acc, curr) => acc + curr, 0);
  } else {
    for (let i = 0; i < 3; i++) {
      p1Total += arr1[i]
      p2Total += arr2[i]
    }
  }
  return p1Total - p2Total
}
