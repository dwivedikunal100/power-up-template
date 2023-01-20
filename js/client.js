var Promise = TrelloPowerUp.Promise;

var GLITCH_ICON = './images/glitch.svg';
var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';


var cardButtonCallback = function (t) {

  var items = ['acad', 'arch', 'badl', 'crla', 'grca', 'yell', 'yose'].map(function (parkCode) {
    var urlForCode = 'http://www.nps.gov/' + parkCode + '/';
    var nameForCode = '🏞 ' + parkCode.toUpperCase();
    return {
      text: nameForCode,
      url: urlForCode,
      callback: function (t) {
        if (t.memberCanWriteToModel('card')) {
          return t.attach({ url: urlForCode, name: nameForCode })
            .then(function () {
              // once that has completed we should tidy up and close the popup
              return t.closePopup();
            });
        } else {
          console.log("Oh no! You don't have permission to add attachments to this card.")
          return t.closePopup(); 
        };
      }
    };
  });

  return t.popup({
    title: 'Popup Search Example',
    items: items, // Trello will search client-side based on the text property of the items
    search: {
      count: 5, // How many items to display at a time
      placeholder: 'Search National Parks',
      empty: 'No parks found'
    }
  });

};

TrelloPowerUp.initialize({
  'card-buttons': function (t, options) {
    return [{
      icon: GLITCH_ICON, // don't use a colored icon here
      text: 'Open Popup',
      callback: cardButtonCallback
    }, {
      // but of course, you could also just kick off to a url if that's your thing
      icon: GRAY_ICON,
      text: 'Just a URL',
      url: 'https://developers.trello.com',
      target: 'Trello Developer Site' // optional target for above url
    }];
  }
});

console.log('Loaded by: ' + document.referrer);