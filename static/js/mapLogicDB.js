
//console.log(geojson)
// Store our API endpoint as queryUrl
//getData();
// retrieve data from database
//console.log(response)
 //console.log(response.features);

  //axios.get('http://127.0.0.1:5000/readFeature')
  //const data = await response.json();
  //const data = response.json();
 // console.log(data);
 //fetch('/readFeature')
 //.then(function (response) {
   //  return response.json();
 //}).then(function (text) {
   //  console.log('GET response:');
   //  console.log(text.greeting); 
 //});
 //getData();
 // retrieve data from database
// async function getData() {
     //fetch('/http://127.0.0.1:5000/getGeojasonData')
     //  .then(response) => {
  //     response.json();

 //    }
   //geojson=('http://127.0.0.1:5504/getGeojasonData')
   // data = response.json();
     
//console.log(geojson)
 //}

  //console.log(response.features);
//var queryUrl =
//"http://127.0.0.1:5000/getGeojasonData"



 var queryUrl =  "https://data.cityofchicago.org/resource/ijzp-q8t2.geojson"
 
 var queryUrl = geojson
 // console.log(queryUrl)

//  var geoDatadb = geoData ( index)

//var geojson;

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
// d3.json(geojson).then(function(data) {
//   console.log(data)
// })
data = geojson
var geoLayer = L.geoJSON(data.features,
//var geoLayer = L.geoJSON(data,
  {
    onEachFeature: function(feature, layer) {
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        
      });
      layer.bindPopup(
        `<h2>District:${feature.properties.district}<br>Location:${feature.properties.block}<br>Crime_Type:${feature.properties.primary_type} <br>Year:${feature.properties.year
        }`
      );
    
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
            fillOpacity: 0.5,
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

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    //fillColor:getColor(feature.properties.primary_type),
    var colors = ['red','blue','green']
    var crimes = ['THEFT','ROBBERY','Other Crime Types'];
  var labels = [];
    // Add min & max
    var legendInfo = "<h1>Crime Type</h1>" 
    // "<div class=\"labels\">" +
      //  "<div class=\"min\">" + limits[0] + "</div>" +
      //  "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    // "</div>";

    div.innerHTML = legendInfo;

    colors.forEach(function(color, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\">"+ crimes[index]+"</li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

// d3.json(queryUrl).then(function(data) {
//   console.log(data.features);
//   console.log(data);
//   // Using the features array sent back in the API data, create a GeoJSON layer and add it to the map
//   var geoLayer = L.geoJSON(data.features,
//   //var geoLayer = L.geoJSON(data,
//     {
//       onEachFeature: function(feature, layer) {
//         layer.on({
//           // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
//           mouseover: function(event) {
//             layer = event.target;
//             layer.setStyle({
//               fillOpacity: 0.9
//             });
//           },
//           mouseout: function(event) {
//             layer = event.target;
//             layer.setStyle({
//               fillOpacity: 0.5
//             });
//           },
          
//         });
//         layer.bindPopup(
//           `<h2>District:${feature.properties.district}<br>Location:${feature.properties.block}<br>Crime_Type:${feature.properties.primary_type} <br>Year:${feature.properties.year
//           }`
//         );
      
//       },
//       pointToLayer:function(feature,latlon){
//           return L.circleMarker(latlon)
//       },
//       style: function(feature) {
//           return {
//               //fillColor:getColor(feature.geometry.coordinates[2]),
//               fillColor:getColor(feature.properties.primary_type),
//               //radius:feature.properties.mag*4,
//               weight:0.5,
//               fillOpacity: 0.5,
//               color:"black"
//           }
//       }
//     }
//   );

//   // Define streetmap and darkmap layers
//   var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   });

//   var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "dark-v10",
//     accessToken: API_KEY
//   });

//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
//   };

//   var overlayMaps = {
//     CrimeArea: geoLayer
//   };

//   // Create a new map
//   myMap = L.map("map", {
//     center: [
//       //37.09, -95.71
//       41.895140898, -87.624255632
//     ],
//     zoom: 13,
//     layers: [streetmap, geoLayer]
//   });

//   // Create a layer control containing our baseMaps
//   // Be sure to add an overlay Layer containing the earthquake GeoJSON
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

//    // Set up the legend
//    var legend = L.control({ position: "bottomright" });
//    legend.onAdd = function() {
//      var div = L.DomUtil.create("div", "info legend");
//      //fillColor:getColor(feature.properties.primary_type),
//      var colors = ['red','blue','green']
//      var crimes = ['THEFT','ROBBERY','Other Crime Types'];
//     var labels = [];
//      // Add min & max
//      var legendInfo = "<h1>Crime Type</h1>" 
//       // "<div class=\"labels\">" +
//        //  "<div class=\"min\">" + limits[0] + "</div>" +
//        //  "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       // "</div>";
 
//      div.innerHTML = legendInfo;
 
//      colors.forEach(function(color, index) {
//        labels.push("<li style=\"background-color: " + colors[index] + "\">"+ crimes[index]+"</li>");
//      });
 
//      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//      return div;
//    };
 
//    // Adding legend to the map
//    legend.addTo(myMap);
// });