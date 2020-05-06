//
// Streetview Map
//

function svinitialize(location) {

  console.log('No peaking!');

  //
  // Get Coords
  //
  // Yeah this is a bit gross, right? Why not do it randomly? Because in geoguessr while it was great having random coords, some of the randomized points it picked sucked. I didn't
  // want that at all, thus the manual lat/longs. It's fairly easy to build the random lat long coords based if the selected coords have a street view available
  // however detection for that is a bit CPU intensive. In the mean time, just throw more coords into this array - it ain't that bad!
  //

  window.locLL = location['Lat'] + ',' + location['Long'];

  // Do streetview
  var whoamiLocation = new google.maps.LatLng(location['Lat'], location['Long']);
  var streetViewService = new google.maps.StreetViewService();
  var STREETVIEW_MAX_DISTANCE = 100;

  streetViewService.getPanoramaByLocation(whoamiLocation, STREETVIEW_MAX_DISTANCE, function(streetViewPanoramaData, status) {
    if (status === google.maps.StreetViewStatus.OK) {

      // We have a streetview pano for this location, so let's roll
      var panoramaOptions = {
        position: whoamiLocation,
        addressControl: false,
        linksControl: false,
        pov: {
          heading: 270,
          zoom: 1,
          pitch: -10
        },
        visible: true
      };

      var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);

    } else {
      // no street view available in this range, or some error occurred
      alert('Streetview is not available for this location :( Mind telling us that you saw this?');
    }
  });
};
