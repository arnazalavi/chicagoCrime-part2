

// Store our API endpoint as queryUrl
var queryUrl =
 "https://data.cityofchicago.org/resource/ijzp-q8t2.geojson"

  function getColor(Crime_Type) {
      if (Crime_Type=='THEFT' ) {
          return "red"
      }
      if (Crime_Type=='ROBBERY' ) {
        return "blue"
      }
     else { 
         return "green"
     }
  }
// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  console.log(data.features);
  // Using the features array sent back in the API data, create a GeoJSON layer and add it to the map
  var geoLayer = L.geoJSON(data.features,
    {
      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          `<h2>District:${feature.properties.district}<br>Location:${feature.properties.block}<br>Crime_Type:${feature.properties.primary_type} <br>Year:${feature.properties.year
          }`
        );
        //layer.on({
     //    mouseover: highlightFeature,
      //    mouseout: resetHighlight,
     //   click: zoomToFeature});
      },
      pointToLayer:function(feature,latlon){
          return L.circleMarker(latlon)
      },
      style: function(feature) {
          return {
              //fillColor:getColor(feature.geometry.coordinates[2]),
              fillColor:getColor(feature.properties.primary_type),
              //radius:feature.properties.mag*4,
              weight:0.5,
              color:"black"
          }
      }
    }
  );

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  var overlayMaps = {
    CrimeArea: geoLayer
  };

  // Create a new map
  myMap = L.map("map", {
    center: [
      //37.09, -95.71
      41.895140898, -87.624255632
    ],
    zoom: 13,
    layers: [streetmap, geoLayer]
  });

  // Create a layer control containing our baseMaps
  // Be sure to add an overlay Layer containing the earthquake GeoJSON
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

});