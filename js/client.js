var Promise = TrelloPowerUp.Promise;

var GLITCH_ICON = './images/glitch.svg';
var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';


var cardButtonCallback = function (t, options) {
  t.getRestApi()
    .isAuthorized()
    .then(function (authorized) {
      if (authorized) {
        console.log("Authorised");
      } else {
        console.log(options);
        console.log("Not Authorised");
      }
    });

  var items = ['acad', 'arch', 'badl', 'crla', 'grca', 'yell', 'yose'].map(function (parkCode) {
    var urlForCode = 'http://www.nps.gov/' + parkCode + '/';
    var nameForCode = '🏞 ' + parkCode.toUpperCase();
    return {
      text: nameForCode,
      url: urlForCode,
      callback: function (t) {
        // In this case we want to attach that park to the card as an attachment
        // but first let's ensure that the user can write on this model
        if (t.memberCanWriteToModel('card')) {
          return t.attach({ url: urlForCode, name: nameForCode })
            .then(function () {
              // once that has completed we should tidy up and close the popup
              return t.closePopup();
            });
        } else {
          console.log("Oh no! You don't have permission to add attachments to this card.")
          return t.closePopup(); // We're just going to close the popup for now.
        };
      }
    };
  });

  // we could provide a standard iframe popup, but in this case we
  // will let Trello do the heavy lifting
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
      // usually you will provide a callback function to be run on button click
      // we recommend that you use a popup on click generally
      icon: GLITCH_ICON, // don't use a colored icon here
      text: 'Open Popup',
      callback: cardButtonCallback(t, options)
    }, {
      // but of course, you could also just kick off to a url if that's your thing
      icon: GRAY_ICON,
      text: 'Just a URL',
      url: 'https://developers.trello.com',
      target: 'Trello Developer Site' // optional target for above url
    }];
  }
}, {
  appKey: "59520c948815839cbeaa20e31374e5ba",
  appName: "delete-button"
});

console.log('Loaded by: ' + document.referrer);