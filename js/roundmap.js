//
// End of round map
//

function rminitialize(location) {
  console.log('End of round called');

  //
  // If locLatLongs or guessLatLongs are undefined, they didn't make a guess and there is no
  // round map for people who run out of time, so don't show it at all
  //
  var currentLLArr = locLatLongs.replace(/[\])}[{(]/g, '').split(',');
  var GuessLLArr = guessLatLongs.replace(/[\])}[{(]/g, '').replace(/\s/g, '').split(',');
  var actualLtLng = new google.maps.LatLng(currentLLArr[0], currentLLArr[1]);
  var guessLtLng = new google.maps.LatLng(GuessLLArr[0], GuessLLArr[1]);

  var mapOptions = {
    zoom: 2,
    center: actualLtLng,
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = new google.maps.Map($('#roundMap')[0], mapOptions);

  var actualMarker = new google.maps.Marker({
    position: actualLtLng,
    title: "Actual Location",
    icon: 'img/actual.png'
  });

  var guessMarker = new google.maps.Marker({
    position: guessLtLng,
    title: "Your Guess",
    icon: 'img/guess.png'
  });

  actualMarker.setMap(map);
  guessMarker.setMap(map);
  renderOtherGuesses(map, location);
};

function renderOtherGuesses(map, location) {
  //intermediate static object before I figure out how to get the data
  $.ajax({
      url: "http://" + window.location.host + "/guess",
      method: "GET",
      data: {
        "Location_ID": location['Location_ID'],
      },
      success: function (otherGuesses) {
        for (var name in otherGuesses) {
          if (otherGuesses.hasOwnProperty(name)) {
            var guess = otherGuesses[name];
            var ltLng = new google.maps.LatLng(guess['Lat'], guess['Long']);
            var Marker = new google.maps.Marker({
              position: ltLng,
              title: name,
              icon: 'img/other.png',
              label: 'Distance: ' + guess['Distance'] + 'Score: ' + guess['Score']
            });
            Marker.setMap(map);
          }
        }
      },
      error: function (result) {
        console.log(result);
      }
    });
}
