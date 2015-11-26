# gtran-kmz

convert geojson to KMZ file

This is a sub-project of [gtran](https://github.com/haoliangyu/gtran).

## Installation

```javascript
npm install gtran-kmz
```

## Functions

* **setPromiseLib(object)**

    Specify the promise library. If not, the library will use the native Promise.

* **fromGeoJson(geojson, fileName, options)**

    Save the geojson into the given file name.

    options:

    * symbol - Symbol of saved features. See detail at [gtran-kml](https://github.com/haoliangyu/gtran-kml).

## Use Example

```javascript
var kmz = require('gtran-kmz');

var pointSymbol = {
    color: '#2dcd86',
    alpha: 255,
    scale: 1,
    icon: 'http://maps.google.com/mapfiles/kml/shapes/square.png'
};

// if specific promise library is needed
kmz.setPromiseLib(require('bluebird'));

// Save geojson into CSV file
kmz.fromGeoJson(geojson, 'point.kmz', {
    symbol: pointSymbol
})
.then(function(fileName) {
    console.log('KMZ file has been saved at:' + fileName);
});

```
