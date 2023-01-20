var Promise = TrelloPowerUp.Promise;

var GLITCH_ICON = './images/glitch.svg';
const token = "ATTA558f6862e6d9c05c87f98baf8ffe332b4b127b3acc3637deb0d4dd0b75c770b4FE538DD2";
const key = "59520c948815839cbeaa20e31374e5ba";

function callIt(cardId) {
  console.log(cardId);
  fetch(`https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`, {
    method: 'DELETE'
  }).then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
    .then(text => console.log(text))
    .catch(err => console.error(err));
}

var cardButtonCallback = function (t) {
  t.card('id').then(function (card) {
    callIt(card.id);
  });
};

TrelloPowerUp.initialize({
  'card-buttons': function (t, options) {
    return [{
      icon: GLITCH_ICON, // don't use a colored icon here
      text: 'DELETE',
      callback: cardButtonCallback
    }];
  }
});

console.log('Loaded by: ' + document.referrer);