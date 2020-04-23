"use strict";

var JSZip = require("jszip");
var kml = require("gtran-kml");
var promiseLib = require("./promise.js");

var Promise, writeFile;
var fs = require("fs");

exports.setPromiseLib = setPromiseLib;

exports.fromGeoJson = function (geojson, fileName, options) {
  if (!Promise) {
    setPromiseLib();
  }

  return kml.fromGeoJson(geojson, undefined, options).then(function (file) {
    var zip = new JSZip();
    zip.file("doc.kml", file.data);

    return Promise((resolve, reject) => {
      var buffer = zip.generate({ type: "nodebuffer" });
      if (fileName) {
        var fileNameWithExt = fileName;
        if (fileNameWithExt.indexOf(".kmz") === -1) {
          fileNameWithExt += ".kmz";
        }

        fs.writeFile(fileNameWithExt, buffer, () => {
          resolve(fileNameWithExt);
        });
      } else {
        resolve({
          data: buffer,
          format: "kmz",
        });
      }
    });
  });
};

function setPromiseLib(lib) {
  Promise = promiseLib.set(lib);
  writeFile = promiseLib.promisify(require("fs").writeFile);

  kml.setPromiseLib(lib);
}
