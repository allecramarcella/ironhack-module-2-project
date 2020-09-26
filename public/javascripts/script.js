

////////////////////////////////////////////////////////////////////////
/////////////////////////////  SIGNIN LOGIN //////////////////////////////
////////////////////////////////////////////////////////////////////////

// const boxHomeSmall = document.getElementById('color-box-small')
// const boxHomeBig = document.getElementById('color-box-big')
// const logoHome = document.getElementById('logo-big')
// const nav = document.getElementsByClassName('nav')[0]
// const loginLink = document.getElementById('login')
// const signupLink = document.getElementById('signup')

// const overlay = document.createElement('div')
// overlay.setAttribute('id', 'overlay')

// const closeIcon = document.createElement('a')
// closeIcon.setAttribute('id', 'closeIcon')
// closeIcon.innerHTML = 'x'
// closeIcon.href = '/'

// const parentHomeScreen = document.getElementsByClassName('header-home')[0]
// const navParent = document.getElementsByClassName('link-items')[0]




// document.getElementById('login').addEventListener('click', function (event) {
//   event.preventDefault()
//   boxHomeBig.remove()
//   boxHomeSmall.remove()
//   logoHome.remove()
//   loginLink.remove()
//   signupLink.remove()

//   parentHomeScreen.insertBefore(overlay, nav)
//   navParent.prepend(closeIcon)
// });





////////////////////////////////////////////////////////////////////////
///////////////////////////// GOOGLE MAPS //////////////////////////////
////////////////////////////////////////////////////////////////////////

function initialize() {
  var input = document.getElementById('search-city');
  new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initialize);



window.addEventListener('load', () => {
  const ironhackBCN = {
    lat: 52.369284,
    lng: 4.882907
  };
 
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackBCN
  });
});

// // TODO: response.data.[restaurants], get('/streetart')??
// function getStreetArt() {
//   axios
//     .get('/streetart')
//     .then(response => {
//       console.log(response)
//       placeStreetArt(response.data.streetarts);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// // TODO: placeRestaurants(....)
// function placeStreetArt(streetarts) {
//   console.log(streetarts)
//   for (let streetart of streetarts) {
//     const center = {
//       lat: streetart.location.coordinates[1],
//       lng: streetart.location.coordinates[0]
//     };
//     const pin = new google.maps.Marker({
//       position: center,
//       map: map,
//       title: streetart.name
//     });
//     markers.push(pin);
//   }
// }

// getStreetArt()

// // Geocoder
// const geocoder = new google.maps.Geocoder();


// // TODO: check getElementById('submit)
// document.getElementById('submit-streetart').addEventListener('click', () => {
//   geocodeAddress(geocoder, map);
// });
 
// function geocodeAddress(geocoder, resultsMap) {
//   const address = document.getElementById('streetart-address').value;
 
//   geocoder.geocode({ address: address }, (results, status) => {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location);
//       let marker = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       });
//       document.getElementById('streetart-latitude').value = results[0].geometry.location.lat();
//       document.getElementById('streetart-longitude').value = results[0].geometry.location.lng();
//     } else {
//       console.log(`Geocode was not successful for the following reason: ${status}`);
//     }
//   });
// }