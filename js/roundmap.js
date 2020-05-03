//
// End of round map
//

function rminitialize() {
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
  renderOtherGuesses(map);
};

function renderOtherGuesses(map) {
  //intermediate static object before I figure out how to get the data
  var otherGuesses = {'A': {'LLArr': [31.710572,-81.731586]}, 'B': {'LLArr': [54.730097,-113.322859]}};
  for (var name in otherGuesses){
    var LLArr = otherGuesses[name]['LLArr'];
    var ltLng = new google.maps.LatLng(LLArr[0], LLArr[1]);
    var Marker = new google.maps.Marker({
      position: ltLng,
      title: name,
      icon: 'img/other.png',
      label: name
    });
    Marker.setMap(map);
  }
}
