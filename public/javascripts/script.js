

////////////////////////////////////////////////////////////////////////
///////////////////////////// GOOGLE MAPS //////////////////////////////
////////////////////////////////////////////////////////////////////////

//////////////////////// AUTOCOMPLETE HOME //////////////////////////
const inputHome = document.getElementById('search-city');
const goButton = document.getElementById('submit-search')


function initialize() {
  const autocomplete = new google.maps.places.Autocomplete(inputHome)
  let cityName 

  autocomplete.addListener('place_changed', event => {
    const autocompleteObject  = autocomplete.getPlace()
    cityName = autocompleteObject.address_components[1].long_name
  })

  goButton.addEventListener('click', event => {
    event.preventDefault()
    console.log('test')
    if(cityName){
      window.location.href = `/streetart/${cityName}`
    } 
  })
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
})


////////////////// GEOCODE////////////////////////

//Get location form
const addForm = document.getElementById('add-st-art-form')


//Listen for input change
addForm.addEventListener('change', geocode);

// Geocode function
function geocode(e){
  e.preventDefault();

  const location = document.getElementById('streetart-address').value;

  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key: 'AIzaSyCOHNeE4wE0P3AqScEVYGTYavwHactzJJs'
    }
  })
  .then(response => {
    console.log(response.data.results[0].geometry.location.lat)
    //formatted address
  
    // asign hidden inputfields
    document.getElementById('streetart-city').value = response.data.results[0].address_components[4].long_name
    document.getElementById('streetart-lat').value = response.data.results[0].geometry.location.lat
    document.getElementById('streetart-long').value = response.data.results[0].geometry.location.lng

  })
  .catch(err => console.log(err))
}





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