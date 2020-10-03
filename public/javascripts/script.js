

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
  
    cityName = autocompleteObject.address_components[1].long_name
    lat = autocompleteObject.geometry.location.lat()
    long = autocompleteObject.geometry.location.lng()
  })

  goButton.addEventListener('click', event => {
    event.preventDefault()
    if(cityName){
      window.location.href = `/streetart/${cityName}?longitude=${long}&latitude=${lat}`
    //   window.location.href = `/streetart/${cityName}`
    } 
  })
}

window.addEventListener('load', initialize)


//////////////////////// GOOGLE MAPS STREET ART BY CITY PAGE  //////////////////////////

function initMap(){
  
  //Styling goolge maps
  var stylesArray =
  [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ff00c8"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#ffff00"
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#ffff00"
        },
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]

  //Get latitude and longitude from url
  const url = window.location.search
  let params = new URLSearchParams(url)
  let lat = Number((params.get("latitude")))
  let lng = Number((params.get("longitude")))

  // Set coordinates and map
  const coordinates = {
    lat: lat,
    lng: lng
  }

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: coordinates,
    styles: stylesArray
  });

  let pin
  let pins = []
  let infowindow
  
  getStreetArt()

  // Fetch streetart from database
  function getStreetArt(){
      axios
        .get('/streetart/show/api')
        .then(response => {
          placeStreetArt(response.data.streetarts)
        })
        .catch(error => {
          console.log(error)
        })
    }
  

  // Place markers
  function placeStreetArt(streetarts){
    streetarts.forEach(streetart => {
      console.log(streetart.streetArtImgUrl)
      const center = {
        lat: streetart.location.coordinates[1],
        lng: streetart.location.coordinates[0]
      }

      const image = {
        url: streetart.streetArtImgUrl,
        // size: new google.maps.Size(80, 80),
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 20)
      }

      const shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: "poly",
      }

      const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";

      infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
  
      pin = new google.maps.Marker({
        position: center,
        map: map,
        icon: image,
        // shape: shape,
      });

      pins.push(pin)

    })

    pins.forEach(pin => {
      pin.addListener("click", () => {
        infowindow.open(map, pin);
      });
    })
 
   
  
  }
}

  





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
  <input  type="number" name='streetNumber' id="street_number" disabled="true" >
  <label>Postal code</label>
  <input type="text" name="postalCode" id="postal_code" disabled="true" >
  <label>City</label>
  <input type="text" name="city" id="locality" disabled="true" >
  <label>Country</label>
  <input type="text" name='country' id='country' disabled="true" >
  <input type="hidden" name="fullAddress" id='full-address'>
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
  autocomplete.setFields(["address_component", "formatted_address", "geometry"]);
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  const place = autocomplete.getPlace();

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
  document.getElementById('full-address').value = place.formatted_address
};




