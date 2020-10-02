

//////////////////////// AUTOCOMPLETE HOME //////////////////////////
const inputHome = document.getElementById('search-city');
const goButton = document.getElementById('submit-search')


function initialize() {
  inputHome.value = ''
  const autocomplete = new google.maps.places.Autocomplete(inputHome)
  autocomplete.setFields(["address_component", "geometry"])

  let cityName 
  let long
  let lat

  autocomplete.addListener('place_changed', event => {
    const autocompleteObject  = autocomplete.getPlace()
    console.log(autocompleteObject)
  
    cityName = autocompleteObject.address_components[1].long_name
    lat = autocompleteObject.geometry.location.lat()
    long = autocompleteObject.geometry.location.lng()
  })

  goButton.addEventListener('click', event => {
    event.preventDefault()
    if(cityName){
      window.location.href = `/streetart/${cityName}&${long}&${lat}`
    } 
  })
}

google.maps.event.addDomListener(window, 'load', initialize);

//////////////////////// GOOGLE MAPS STREET ART BY CITY PAGE  //////////////////////////

window.addEventListener('load', () => {
  // const ironhackBCN = {
  //   lat: 52.369284,
  //   lng: 4.882907
  // };

  let url = window.location.href
  let arrUrl = url.split('&')

  const coordinates = {
    lat: parseInt(arrUrl[2]),
    lng: parseInt(arrUrl[1])
  }
 
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coordinates
  });
})



//////////////////////// EVENT LISTNER ADD BTN //////////////////////////

const addBtn = document.getElementById('add-btn-citymap')


addBtn.addEventListener('click', event => {
  event.preventDefault()

  addBtn.remove()

  const addFormHTML = `
  <form method="POST" action="/streetart/add" enctype="multipart/form-data" id="add-st-art-form">
  <input type="text" name="name" placeholder="name artwork" >
  <input type="text" name="artist" placeholder="name artist" >
 
  <label>Address</label>
  <input type="text" name='address' placeholder="Enter your address" id="streetart-address2">

  <label>Street</label>
  <input type="text" name='street' id="route"  class="field" disabled="true" >
  <label>Number</label>
  <input  type="number" name='street-number' id="street_number" disabled="true" >
  <label>Postal code</label>
  <input type="text" name="postal_code" id="postal_code" disabled="true" >
  <label>City</label>
  <input type="text" name="city" id="locality" disabled="true" >
  <label>Country</label>
  <input type="text" name='country' id='country' disabled="true" >
  <input type="hidden" name="latitude" id="streetart-lat" >
  <input type="hidden" name="longitude"  id="streetart-lng">


  <label for="input-streetArt-picture">Upload picture street art </label>
  <input type="file" name='streetArt-picture' id="input-streetArt-picture">
 
  <input type="submit" name="" id="submit-streetart">
</form>
  `

  document.getElementById('add-art').innerHTML += addFormHTML
  initAutocomplete()
})



//////////////////////// AUTOCOMPLETE ADD FORM //////////////////////////

let placeSearch;
let autocomplete;
const componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  country: "long_name",
  postal_code: "short_name",
};

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("streetart-address2"),
    { types: ["geocode"] }
  );
  autocomplete.setFields(["address_component", "geometry"]);
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  const place = autocomplete.getPlace();
  console.log(place.geometry.location.lat())


  for (const component in componentForm) {
    document.getElementById(component).value = "";
    document.getElementById(component).disabled = false;
  }

  for (const component of place.address_components) {
  
    const addressType = component.types[0];
    if (componentForm[addressType]) {
      const val = component[componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
  document.getElementById('streetart-lat').value = place.geometry.location.lat()
  document.getElementById('streetart-lng').value = place.geometry.location.lng()

}




